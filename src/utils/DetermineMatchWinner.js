import geckoCodeGenerator from './GeckoCodeGeneration.js';

const { shell } = require('electron');
const path = require('path');
const app = path.join("C:/Users/Léo/AppData/Roaming/Slippi Launcher/netplay/Slippi Dolphin.exe");




//Placeholder capture resolution
export default function DetermineMatchWinner(attackingPiece, defendingPiece, board) {
    const randomNum = Math.floor(Math.random() * 2);
    const winner = randomNum < 1 ? attackingPiece : defendingPiece;

    //Testing the gecko code gen
    const myGecko = geckoCodeGenerator(attackingPiece, defendingPiece, board);
    console.log(myGecko);
    
    function openDolphin(){
        shell.openExternal(app);
    }
    openDolphin();

    return winner;
}
  