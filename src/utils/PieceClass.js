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
    this._damage = 0;
    //Id based on starting coordinates 
    this._id = `${this._y}-${this._x}`;
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

  set y(val) {
    if (this._y !== val) {
      this._hasMoved = true;
    }
    this._y = val;
  }

  get x() {
    return this._x;
  }

  set x(val) {
    if (this._x !== val) {
      this._hasMoved = true;
    }
    this._x = val;
  }

  get hasMoved() {
    return this._hasMoved;
  }

  get stocks() {
    return this._stocks;
  }
  
  get id() {
    return this._id;
  }

  get damage() {
    return this._damage;
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
            possibleMoves.push([this.y + 1, this.x - 1]);
          }
          if (
            this.y + 1 >= 0 && this.x + 1 < twoDArr[0].length &&
            twoDArr[this.y + 1][this.x + 1] &&
            twoDArr[this.y + 1][this.x + 1].team === "white"
          ) {
            possibleMoves.push([this.y + 1, this.x + 1]);
          }
        }
        break;
      case "rook":
        //Up move & capture logic
        for(let i = 1; this.y - i >= 0; i++) {
          if (!twoDArr[this.y - i][this.x]){
            possibleMoves.push([this.y - i, this.x]);
            continue;
          } else if (twoDArr[this.y - i][this.x] && twoDArr[this.y - i][this.x].team !== this.team) {
            possibleMoves.push([this.y - i, this.x]);
            break;
          } 
          break;
        }
        //Right move & capture logic
        for(let i = 1; this.x + i < twoDArr[0].length ; i++) {
          if (!twoDArr[this.y][this.x + i]){
            possibleMoves.push([this.y, this.x + i]);
            continue;
          } else if (twoDArr[this.y][this.x + i] && twoDArr[this.y][this.x + i].team !== this.team) {
            possibleMoves.push([this.y, this.x + i]);
            break;
          } 
          break;  
        }
        //Down move & capture logic
        for(let i = 1; this.y + i < twoDArr.length; i++) {
          if (!twoDArr[this.y + i][this.x]){
            possibleMoves.push([this.y + i, this.x]);
            continue;
          } else if (twoDArr[this.y + i][this.x] && twoDArr[this.y + i][this.x].team !== this.team) {
            possibleMoves.push([this.y + i, this.x]);
            break;
          } 
          break;
        }
        //Left move & capture logic
        for(let i = 1; this.x - i >= 0 ; i++) {
          if (!twoDArr[this.y][this.x - i]){
            possibleMoves.push([this.y, this.x - i]);
            continue;
          } else if (twoDArr[this.y][this.x - i] && twoDArr[this.y][this.x - i].team !== this.team) {
            possibleMoves.push([this.y, this.x - i]);
            break;
          } 
          break;
        }
        break;
      case "knight":
        //top-right move & capture logic
        (this.y - 2 >= 0 && this.x + 1 < twoDArr[0].length) && (!twoDArr[this.y - 2][this.x + 1] || twoDArr[this.y - 2][this.x + 1].team !== this.team) 
        && possibleMoves.push([this.y - 2, this.x + 1]);
        //right-top move & capture logic
        (this.y - 1 >= 0 && this.x + 2 < twoDArr[0].length) && (!twoDArr[this.y - 1][this.x + 2] || twoDArr[this.y - 1][this.x + 2].team !== this.team) 
        && possibleMoves.push([this.y - 1, this.x + 2]);
        //right-bottom move & capture logic
        (this.y + 1 <twoDArr.length && this.x + 2 < twoDArr[0].length) && (!twoDArr[this.y + 1][this.x + 2] || twoDArr[this.y + 1][this.x + 2].team !== this.team) 
        && possibleMoves.push([this.y + 1, this.x + 2]);
        //bottom-right move & capture logic
        (this.y + 2 <twoDArr.length && this.x + 1 < twoDArr[0].length) && (!twoDArr[this.y + 2][this.x + 1] || twoDArr[this.y + 2][this.x + 1].team !== this.team) 
        && possibleMoves.push([this.y + 2, this.x + 1]);
        //bottom-left move & capture logic
        (this.y + 2 <twoDArr.length && this.x - 1 >= 0) && (!twoDArr[this.y + 2][this.x - 1] || twoDArr[this.y + 2][this.x - 1].team !== this.team) 
        && possibleMoves.push([this.y + 2, this.x - 1]);
        //left-bottom move & capture logic
        (this.y + 1 <twoDArr.length && this.x - 2 >= 0) && (!twoDArr[this.y + 1][this.x - 2] || twoDArr[this.y + 1][this.x - 2].team !== this.team) 
        && possibleMoves.push([this.y + 1, this.x - 2]);
        //left-top move & capture logic
        (this.y - 1 >= 0 && this.x - 2 >= 0) && (!twoDArr[this.y - 1][this.x - 2] || twoDArr[this.y - 1][this.x - 2].team !== this.team) 
        && possibleMoves.push([this.y - 1, this.x - 2]);
        //top-left move & capture logic
        (this.y - 2 >= 0 && this.x - 1 >= 0) && (!twoDArr[this.y - 2][this.x - 1] || twoDArr[this.y - 2][this.x - 1].team !== this.team) 
        && possibleMoves.push([this.y - 2, this.x - 1]);
        break;
      case "bishop":
        //Top-left move & capture logic
        for(let i = + 1; this.y - i >= 0 && this.x - i >= 0; i++) {
          if (!twoDArr[this.y - i][this.x - i]){
            possibleMoves.push([this.y - i, this.x - i]);
            continue
          } else if (twoDArr[this.y - i][this.x - i] && twoDArr[this.y - i][this.x - i].team !== this.team){
            possibleMoves.push([this.y - i, this.x - i]);
            break;
          }  
          break;
        }
        //Top-right move & capture logic
        for(let i = 1; this.y - i >= 0 && this.x + i < twoDArr[0].length; i++) {
          if (!twoDArr[this.y - i][this.x + i]){
            possibleMoves.push([this.y - i, this.x + i]);
            continue
          } else if (twoDArr[this.y - i][this.x + i] && twoDArr[this.y - i][this.x + i].team !== this.team){
            possibleMoves.push([this.y - i, this.x + i]);
            break;
          }  
          break;
        }
        //Bottom-right move & capture logic
        for(let i = 1; this.y + i < twoDArr.length && this.x + i < twoDArr[0].length; i++) {
          if (!twoDArr[this.y + i][this.x + i]){
            possibleMoves.push([this.y + i, this.x + i]);
            continue
          } else if (twoDArr[this.y + i][this.x + i] && twoDArr[this.y + i][this.x + i].team !== this.team){
            possibleMoves.push([this.y + i, this.x + i]);
            break;
          } 
          break;
        }
        //Bottom-left move & capture logic
        for(let i = + 1; this.y + i < twoDArr.length && this.x - i >= 0; i++) {
          if (!twoDArr[this.y + i][this.x - i]){
            possibleMoves.push([this.y + i, this.x - i]);
            continue
          } else if (twoDArr[this.y + i][this.x - i] && twoDArr[this.y + i][this.x - i].team !== this.team){
            possibleMoves.push([this.y + i, this.x - i]);
            break;
          }  
          break;
        }
        break;
      case "queen":
        //Up move & capture logic
        for(let i = 1; this.y - i >= 0; i++) {
          if (!twoDArr[this.y - i][this.x]){
            possibleMoves.push([this.y - i, this.x]);
            continue;
          } else if (twoDArr[this.y - i][this.x] && twoDArr[this.y - i][this.x].team !== this.team) {
            possibleMoves.push([this.y - i, this.x]);
            break;
          } 
          break;
        }
        //Right move & capture logic
        for(let i = 1; this.x + i < twoDArr[0].length ; i++) {
          if (!twoDArr[this.y][this.x + i]){
            possibleMoves.push([this.y, this.x + i]);
            continue;
          } else if (twoDArr[this.y][this.x + i] && twoDArr[this.y][this.x + i].team !== this.team) {
            possibleMoves.push([this.y, this.x + i]);
            break;
          } 
          break;  
        }
        //Down move & capture logic
        for(let i = 1; this.y + i < twoDArr.length; i++) {
          if (!twoDArr[this.y + i][this.x]){
            possibleMoves.push([this.y + i, this.x]);
            continue;
          } else if (twoDArr[this.y + i][this.x] && twoDArr[this.y + i][this.x].team !== this.team) {
            possibleMoves.push([this.y + i, this.x]);
            break;
          } 
          break;
        }
        //Left move & capture logic
        for(let i = 1; this.x - i >= 0 ; i++) {
          if (!twoDArr[this.y][this.x - i]){
            possibleMoves.push([this.y, this.x - i]);
            continue;
          } else if (twoDArr[this.y][this.x - i] && twoDArr[this.y][this.x - i].team !== this.team) {
            possibleMoves.push([this.y, this.x - i]);
            break;
          } 
          break;
        }
        //Top-left move & capture logic
        for(let i = + 1; this.y - i >= 0 && this.x - i >= 0; i++) {
          if (!twoDArr[this.y - i][this.x - i]){
            possibleMoves.push([this.y - i, this.x - i]);
            continue;
          } else if (twoDArr[this.y - i][this.x - i] && twoDArr[this.y - i][this.x - i].team !== this.team){
            possibleMoves.push([this.y - i, this.x - i]);
            break;
          }  
          break;
        }
        //Top-right move & capture logic
        for(let i = 1; this.y - i >= 0 && this.x + i < twoDArr[0].length; i++) {
          if (!twoDArr[this.y - i][this.x + i]){
            possibleMoves.push([this.y - i, this.x + i]);
            continue;
          } else if (twoDArr[this.y - i][this.x + i] && twoDArr[this.y - i][this.x + i].team !== this.team){
            possibleMoves.push([this.y - i, this.x + i]);
            break;
          }  
          break;
        }
        //Bottom-right move & capture logic
        for(let i = 1; this.y + i < twoDArr.length && this.x + i < twoDArr[0].length; i++) {
          if (!twoDArr[this.y + i][this.x + i]){
            possibleMoves.push([this.y + i, this.x + i]);
            continue;
          } else if (twoDArr[this.y + i][this.x + i] && twoDArr[this.y + i][this.x + i].team !== this.team){
            possibleMoves.push([this.y + i, this.x + i]);
            break;
          } 
          break;
        }
        //Bottom-left move & capture logic
        for(let i = + 1; this.y + i < twoDArr.length && this.x - i >= 0; i++) {
          if (!twoDArr[this.y + i][this.x - i]){
            possibleMoves.push([this.y + i, this.x - i]);
            continue
          } else if (twoDArr[this.y + i][this.x - i] && twoDArr[this.y + i][this.x - i].team !== this.team){
            possibleMoves.push([this.y + i, this.x - i]);
            break;
          }  
          break;
        }
        break;
      case "king":
        //Up move & capture logic
          if (this.y - 1 >=0 && (!twoDArr[this.y - 1][this.x] || twoDArr[this.y - 1][this.x].team !== this.team)){
            possibleMoves.push([this.y - 1, this.x])
          } 
        //Right move & capture logic
          if (this.x + 1 < twoDArr[0].length && (!twoDArr[this.y][this.x + 1] || twoDArr[this.y][this.x + 1].team !== this.team)){
            possibleMoves.push([this.y, this.x + 1])
          }
        //Down move & capture logic
          if (this.y + 1 < twoDArr.length && (!twoDArr[this.y + 1][this.x] || twoDArr[this.y + 1][this.x].team !== this.team)){
            possibleMoves.push([this.y + 1, this.x])
          }
        //Left move & capture logic
          if (this.x - 1 >=0 && (!twoDArr[this.y][this.x - 1] || twoDArr[this.y][this.x - 1].team !== this.team)){
            possibleMoves.push([this.y, this.x - 1])
          }
        //Top-left move & capture logic
          if ((this.x - 1 >=0 && this.y - 1 >= 0) && (!twoDArr[this.y - 1][this.x - 1] || twoDArr[this.y - 1][this.x - 1].team !== this.team)){
            possibleMoves.push([this.y - 1, this.x - 1])
          }
        //Top-right move & capture logic
          if ((this.x + 1 < twoDArr[0].length && this.y - 1 >= 0) && (!twoDArr[this.y - 1][this.x + 1] || twoDArr[this.y - 1][this.x + 1].team !== this.team)){
            possibleMoves.push([this.y - 1, this.x + 1]) 
          }
        //Bottom-right move & capture logic
          if ((this.x + 1 < twoDArr[0].length && this.y + 1 < twoDArr.length) && (!twoDArr[this.y + 1][this.x + 1] || twoDArr[this.y + 1][this.x + 1].team !== this.team)){
            possibleMoves.push([this.y + 1, this.x + 1])
         }
        //Bottom-left move & capture logic
          if ((this.x - 1 >= 0 && this.y + 1 < twoDArr.length) && (!twoDArr[this.y + 1][this.x - 1] || twoDArr[this.y + 1][this.x - 1].team !== this.team)){
            possibleMoves.push([this.y + 1, this.x - 1])
          }
        break;
      }
    return possibleMoves;
  }
}
