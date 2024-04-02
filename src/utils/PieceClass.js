import { numOfStartingStocks } from "./Rules";

export default class Piece {
  constructor(team, type, char, y, x) {
    this._team = team;
    this._type = type;
    this._char = char;
    this._y = y;
    this._x = x;
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

  get y() {
    return this._y;
  }

  get x() {
    return this._x;
  }

  get hasMoved() {
    return this._hasMoved;
  }

  determineStartingStocks() {
    switch (this._type) {
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
      default:
        console.log("invalid pieceType");
        return 0;
    }
  }

  determinePossibleMoves(twoDArr) {
    const possibleMoves = [];
    switch (this.type) {
      case "pawn":
        //Case for white
        if (this.team === "white") {
          //single-forward-move
          if (this.y - 1 >= 0 && !twoDArr[this.y - 1][this.x]) {
            possibleMoves.push([this.y - 1, this.x]);
            //double-forward-move
            if (!twoDArr[this.y - 2][this.x] && !this.hasMoved) {
              possibleMoves.push([this.y - 2, this.x]);
            }
          }
          //capture logic
          if (
            this.y - 1 >= 0 && this.x - 1 >= 0 &&
            twoDArr[this.y - 1][this.x - 1] &&
            twoDArr[this.y - 1][this.x - 1].team === "black"
          ) {
            possibleMoves.push([this.y - 1, this.x - 1]);
          }
          if (
            this.y - 1 >= 0 && this.x + 1 < twoDArr[0].length &&
            twoDArr[this.y - 1][this.x + 1] &&
            twoDArr[this.y - 1][this.x + 1].team === "black"
          ) {
            possibleMoves.push([this.y - 1, this.x + 1]);
          }
        //Case for black
        } else {
          //single-forward-move
          if (!twoDArr[this.y + 1][this.x]) {
            possibleMoves.push([this.y + 1, this.x]);
            //double-forward-move
            if (!twoDArr[this.y + 2][this.x] && !this.hasMoved) {
              possibleMoves.push([this.y + 2, this.x]);
            }
          }
          //capture logic
          if (
            this.y + 1 < twoDArr.length && this.x - 1 >= 0 &&
            twoDArr[this.y + 1][this.x - 1] &&
            twoDArr[this.y + 1][this.x - 1].team === "white"
          ) {
            possibleMoves.push([this.y - 1, this.x - 1]);
          }
          if (
            this.y - 1 >= 0 && this.x + 1 < twoDArr[0].length &&
            twoDArr[this.y + 1][this.x + 1] &&
            twoDArr[this.y + 1][this.x + 1].team === "white"
          ) {
            possibleMoves.push([this.y + 1, this.x + 1]);
          }
        }
        break;
      case "rook":
        //Up move & capture logic
        for(let i = - 1; i + this.y >= 0; i--) {
          if (!twoDArr[this.y + i][this.x] || twoDArr[this.y + i][this.x].team !== this.team){
            possibleMoves.push([this.y + i, this.x])
          } else {
            break;
          }  
        }
    }
    console.log(possibleMoves);
    return possibleMoves;
  }
}
