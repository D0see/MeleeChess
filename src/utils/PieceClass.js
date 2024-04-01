import { numOfStartingStocks } from "./Rules";

export default class Piece {
    constructor(team, type, char, yPosition, xPosition){
        this._team = team;
        this._type = type;
        this._char = char;
        this._yPosition = yPosition;
        this._xPosition = xPosition;
        this._hasMoved = false;
        this._stocks = this.determineStartingStocks();
    }

    get team() {
        return this._team;
    }
    
    get type() {
        return this._type;
    }

    get char() {
        return this._char;
    }

    

    determineStartingStocks(){
        switch(this._type){
            case "pawn":
                return numOfStartingStocks.pawn;
            case "rook":
                return numOfStartingStocks.rook;
            case "knight":
                return numOfStartingStocks.knight;
            case "bishop":
                return numOfStartingStocks.bishop;
            case "queen":
                return numOfStartingStocks.queen;
            case "king":
                return numOfStartingStocks.king;
            default : 
                console.log("invalid pieceType");
                return 0;
        }
    }

    determinePossibleMoves(twoDArr){
        //switchcase
    }
}