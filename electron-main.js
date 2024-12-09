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
// read and return a specific line
function readSpecificLine(filePath, lineIndex) {
  const data = fs.readFileSync(filePath, 'utf8');
  const lines = data.split('\n');
  if (lineIndex < 0 || lineIndex >= lines.length) {
      throw new Error('Invalid line index');
  }
  return lines[lineIndex];
}
const dolphinIniPath = path.join(app.getPath("userData"), "netplay/User/Config/Dolphin.ini");
const lineIndexOfIsoPath = 3; // Index of the line you want to read (0-based)
let isoPath;
let isoPath0;


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

const customReplayFolderPath = path.join(app.getPath("userData"), "Replays")
async function writeToSpecificLine(filePath, lineNumber, data) {
  return new Promise((resolve, reject) => {
      // Read the contents of the file
      fs.readFile(filePath, 'utf8', (err, contents) => {
          if (err) {
              reject(err);
              return;
          }

          // Split the contents by lines
          const lines = contents.split('\n');

          // Modify the specific line
          if (lineNumber >= 0 && lineNumber < lines.length) {
              lines[lineNumber] = data;
          } else {
              reject(new Error('Line number out of range'));
              return;
          }

          // Join the modified lines back together
          const modifiedContents = lines.join('\n');

          // Write the modified contents back to the file
          fs.writeFile(filePath, modifiedContents, 'utf8', (err) => {
              if (err) {
                  reject(err);
                  return;
              }
              resolve();
          });
      });
  });
}

//On application start
copyFolder(slippiUserFolder, destinationFolderPath)
.then(() => isoPath = readSpecificLine(dolphinIniPath, lineIndexOfIsoPath).slice(15)) // TO TEST ON DIFFERENT SLIPPI SETUP
.then(() => writeToSpecificLine(dolphinIniPath, 12, `SlippiReplayDir = ${customReplayFolderPath}`))
.then(() => writeToSpecificLine(dolphinIniPath, 13, `SlippiReplayMonthFolders = False`))
.then(() => fs.ensureDirSync(customReplayFolderPath))

//dolphin-child-process
let dolphin;
app.whenReady().then(() => {
  
  ipcMain.handle('start-dolphin', () => {
      const dolphinPath = path.join(app.getPath("userData"), "netplay/Slippi Dolphin.exe")
      const userPath = path.join(app.getPath("userData"), "netplay/User/")
      dolphin = execFile(dolphinPath, ["--batch", "--exec", `${isoPath}`, "--user", "netplay/User/"], {encoding: 'utf8', cwd: app.getPath("userData")}, function(err, stdout) {
          if (err) {
              console.error(err);
              return;
          }
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
          const watcher = chokidar.watch(customReplayFolderPath, {
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
                  dolphin.kill();
                  const endTypes = {
                      1: "TIME!",
                      2: "GAME!",
                      7: "No Contest",
                  };
                  const endMessage = endTypes[gameEnd.gameEndMethod] || "Unknown";
                  const lastFrame = game.getLatestFrame();
                  const winnerData = {};

                  //Determines winner
                  // if the game ends normally
                  if (gameEnd.gameEndMethod !== 7) {
                    for(const port of gameEnd.placements){
                      port.position === 0 ? winnerData.winner = port.playerIndex: "";
                    }
                  } else {
                  // if Paf LRA-START 
                    0 !== gameEnd.lrasInitiatorIndex ? winnerData.winner = 0 : winnerData.winner = 1;
                  }
                  winnerData.stocks = lastFrame.players[winnerData.winner].post.stocksRemaining;
                  winnerData.damage = Math.floor(lastFrame.players[winnerData.winner].post.percent);
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