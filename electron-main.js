// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const { execFile } = require('node:child_process');
const { ipcMain } = require('electron');
const { SlippiGame } = require("@slippi/slippi-js");
const chokidar = require("chokidar");
const fs = require('fs-extra');
const path = require("node:path");
const express = require("express");
const cors = require("cors");
const { error } = require("node:console");
const localServerApp = express();
const PORT = 3001;
const startLocalServer = (done) => {
  localServerApp.use(express.json({ limit: "100mb" }));
  localServerApp.use(cors());
  localServerApp.use(express.static('./build/'));
  localServerApp.listen(PORT, async () => {
    console.log("Server Started on PORT ", PORT);
    done();
  });
};

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, "./public/index.html"),
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  //   mainWindow.loadFile('index.html')
  mainWindow.loadURL("http://localhost:" + PORT);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

//Copy a folder to a destination
async function copyFolder(source, destination) {
  try {
    await fs.copy(source, destination);
    console.log('Folder copied successfully');
  } catch (err) {
    console.error('Error copying folder:', err);
  }
}
//const slippiUserFolder = path.join("C:/Users/Léo/AppData/Roaming/Slippi Launcher/netplay");
const slippiUserFolder = path.join(app.getPath("userData"), "../Slippi Launcher/netplay");
const destinationFolderPath = path.join(app.getPath("userData"), "netplay");
copyFolder(slippiUserFolder, destinationFolderPath);

function readSpecificLine(filePath, lineIndex) {
  const data = fs.readFileSync(filePath, 'utf8');
  const lines = data.split('\n');
  if (lineIndex < 0 || lineIndex >= lines.length) {
      throw new Error('Invalid line index');
  }
  return lines[lineIndex];
}

const filePath = path.join(app.getPath("userData"), "netplay/User/Config/Dolphin.ini");
const lineIndex = 2; // Index of the line you want to read (0-based)
const isoPath = readSpecificLine(filePath, lineIndex);
console.log(isoPath)

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// arg to pass ["--user", "C:/Users/Léo/AppData/Roaming/meleechess/User"]
app.whenReady().then(() => {
  
  ipcMain.handle('start-dolphin', () => {
      console.log("starting dolphin");
      const dolphinPath = path.join(app.getPath("userData"), "netplay/Slippi Dolphin.exe")
      const userPath = path.join(app.getPath("userData"), "netplay/User/")
      console.log(path.normalize(userPath));
      execFile(dolphinPath, ["--user", "netplay/User/"], {encoding: 'utf8', cwd: app.getPath("userData")}, function(err, stdout) {
          if (err) {
              console.error(err);
              return;
          }
          console.log(stdout);

      });   
  });
  ipcMain.handle('write-gecko', (event, configString) => {
    // Write to file asynchronously
    const sysGeckoPath = path.join(app.getPath("userData"), "netplay/Sys/GameSettings/GALE01r2.ini");
    const userGeckoPath = path.join(app.getPath("userData"), "netplay/User/GameSettings/GALE01.ini");

    fs.writeFile(sysGeckoPath, configString, (err) => {
      if (err) {
          console.error('Error writing to config file', err);
          return;
      }
      console.log('Config has been written to', sysGeckoPath);
    });
    fs.writeFile(userGeckoPath, configString, (err) => {
      if (err) {
          console.error('Error writing to config file', err);
          return;
      }
      console.log('Config has been written to', userGeckoPath);
    });
  });
  ipcMain.handle('watch-game-result', () => {
    let winner;
      return new Promise((resolve, reject) => {
          const watcher = chokidar.watch(path.join(app.getPath("documents"), "Slippi/2024-04"), {
              depth: 0,
              persistent: true,
              usePolling: true,
              ignoreInitial: true,
          });
  
          let game = null;
          watcher.on("change", (path) => {
              if (!game) {
                  game = new SlippiGame(path, { processOnTheFly: true });
                  console.log("New slp file: ", path);
              }
  
              let gameEnd = game.getGameEnd();
              if (gameEnd) {
                  const endTypes = {
                      1: "TIME!",
                      2: "GAME!",
                      7: "No Contest",
                  };
                  const endMessage = endTypes[gameEnd.gameEndMethod] || "Unknown";
                  const lastFrame = game.getLatestFrame();
                  const winnerData = {};

                  //Determines winner
                  // the game ends normally
                  if (gameEnd.gameEndMethod !== 7) {
                    for(const port of gameEnd.placements){
                      port.position === 0 ? winnerData.winner = port.playerIndex: "";
                    }
                  } else {
                  // if Paf LRA-START
                    for(const port of gameEnd.placements) {
                      port.position !== gameEnd.lrasInitiatorIndex ? winnerData.winner = port.playerIndex : "";
                    }
                  }
                  console.log(lastFrame.players[winnerData.winner].post.percent);
                  winnerData.stocks = lastFrame.players[winnerData.winner].post.stocksRemaining;
                  winnerData.damage = Math.floor(lastFrame.players[winnerData.winner].post.percent);

                  console.log(gameEnd);
                  
                  const lrasText = gameEnd.gameEndMethod === 7 ? ` | Quitter Index: ${gameEnd.lrasInitiatorIndex}` : "";
                  console.log(`[Game Complete] Type: ${endMessage}${lrasText}`);
                  game = null;
                  watcher.close().then(() => resolve(winnerData));
              }
          });
      });
    }
  );
  startLocalServer(createWindow);

  app.on("activate", function() {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}).catch(error => console.log(error));

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.