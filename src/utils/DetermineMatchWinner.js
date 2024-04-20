import GeckoCodeGenerator from './GeckoCodeGenerator.js';

//Placeholder capture resolution
export default function DetermineMatchWinner(attackingPiece, defendingPiece, board) {
    // const randomNum = Math.floor(Math.random() * 2);
    //const winner = randomNum < 1 ? attackingPiece : defendingPiece;
    const white = attackingPiece.team === "white" ? attackingPiece : defendingPiece;
    console.log(white.team, "white");
    const black = white.id === attackingPiece.id ?  defendingPiece: attackingPiece; 
    console.log(black.team, "black");

    //Testing the gecko code gen
    const meleeChessConfig = GeckoCodeGenerator(attackingPiece, defendingPiece, board);
    window.dolphinApi.writeGecko(meleeChessConfig);
    window.dolphinApi.startDolphin();

    let winner;
    return new Promise((resolve, reject) => {
        window.dolphinApi.watchGameResult().then(res => {
            if (res.winner === 0) {
                winner = white;
            } else {
                winner = black;
            }
            winner.damage = res.damage;
            winner.stocks = res.stocks;
            console.log(winner);
            return resolve(winner);
        });
    });
}
