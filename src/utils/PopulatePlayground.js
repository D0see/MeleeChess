const twoDArrayBuilder = (size) => {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push([]);
        for (let j = 0; j < size; j++) {
            arr[i].push(null);
        }
    } 
    return arr;
}

const populate = (emptyPlayground, teams, PieceClass) => {
    const populatedPlayground = emptyPlayground;

    const placePawns = (populatedPlayground, teams, PieceClass) => {
        for (let i = 0; i < populatedPlayground[0].length; i++){
            populatedPlayground[1][i] = new PieceClass("black","pawn", teams.black.pawn, 1, i);
            populatedPlayground[populatedPlayground.length - 2][i] = new PieceClass("white","pawn", teams.white.pawn, populatedPlayground.length - 2, i)
        }
    }
    placePawns(populatedPlayground, teams, PieceClass);
    const placeRooks = (populatedPlayground, teams, PieceClass) => {
        populatedPlayground[0][0] = new PieceClass("black", "rook", teams.black.rook, 0, 0);
        populatedPlayground[0][7] = new PieceClass("black", "rook", teams.black.rook, 0, 7);
        populatedPlayground[populatedPlayground.length - 1][0] = new PieceClass("white", "rook", teams.white.rook, populatedPlayground.length - 1, 0);
        populatedPlayground[populatedPlayground.length - 1][7] = new PieceClass("white", "rook", teams.white.rook, populatedPlayground.length - 1, 7);
    }
    placeRooks(populatedPlayground, teams, PieceClass);
    const placeKnights = (populatedPlayground, teams, PieceClass) => {
        populatedPlayground[0][1] = new PieceClass("black", "knight", teams.black.knight, 0, 1);
        populatedPlayground[0][6] = new PieceClass("black", "knight", teams.black.knight, 0, 6);
        populatedPlayground[populatedPlayground.length - 1][1] = new PieceClass("white", "knight", teams.white.knight, populatedPlayground.length - 1, 1);
        populatedPlayground[populatedPlayground.length - 1][6] = new PieceClass("white", "knight", teams.white.knight, populatedPlayground.length - 1, 6);
    }
    placeKnights(populatedPlayground, teams, PieceClass);
    const placeBishops = (populatedPlayground, teams, PieceClass) => {
        populatedPlayground[0][2] = new PieceClass("black", "bishop", teams.black.bishop, 0, 2);
        populatedPlayground[0][5] = new PieceClass("black", "bishop", teams.black.bishop, 0, 5);
        populatedPlayground[populatedPlayground.length - 1][2] = new PieceClass("white", "bishop", teams.white.bishop, populatedPlayground.length - 1, 2);
        populatedPlayground[populatedPlayground.length - 1][5] = new PieceClass("white", "bishop", teams.white.bishop, populatedPlayground.length - 1, 5);
    }
    placeBishops(populatedPlayground, teams, PieceClass);
    const placeQueens = (populatedPlayground, teams, PieceClass) => {
        populatedPlayground[0][3] = new PieceClass("black", "queen", teams.black.queen, 0, 3);
        populatedPlayground[populatedPlayground.length - 1][3] = new PieceClass("white", "queen", teams.white.queen, populatedPlayground.length - 1, 3);
    }
    placeQueens(populatedPlayground, teams, PieceClass);
    const placeKings = (populatedPlayground, teams, PieceClass) => {
        populatedPlayground[0][4] = new PieceClass("black", "king", teams.black.king, 0, 4);
        populatedPlayground[populatedPlayground.length - 1][4] = new PieceClass("white", "king", teams.white.king, populatedPlayground.length - 1, 4);
    }
    placeKings(populatedPlayground, teams, PieceClass);
    console.log(populatedPlayground);
    return populatedPlayground;
}
    
const populatePlayground = {
    twoDArrayBuilder: twoDArrayBuilder,
    populate: populate
}

export default populatePlayground;