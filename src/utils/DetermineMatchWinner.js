import GeckoCodeGenerator from './GeckoCodeGenerator.js';

//Placeholder capture resolution
export default function DetermineMatchWinner(attackingPiece, defendingPiece, board) {
    const randomNum = Math.floor(Math.random() * 2);
    const winner = randomNum < 1 ? attackingPiece : defendingPiece;

    //Testing the gecko code gen
    const meleeChessConfig = GeckoCodeGenerator(attackingPiece, defendingPiece, board);
    console.log(meleeChessConfig);
    window.dolphinApi.writeGecko(meleeChessConfig);
    window.dolphinApi.startDolphin()
        .then(() => console.log("Need to parse .slp file here"))
        .catch(err => console.error(err));

    return winner;
}
  