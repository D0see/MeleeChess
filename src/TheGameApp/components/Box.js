import React from "react";
import CharacterImg from '../../Shared/CharacterImg';
import PieceImg from '../../Shared/PieceImg';
export default function Box({defaultBackground, pieceData, onClick}) {
  return (
    <div className="Box" onClick = {onClick} style={{ backgroundColor: defaultBackground }}>
     {pieceData &&
      <div className="CharPiece">
        <PieceImg
          className="Piece"
          pieceName={`${pieceData.team}_${pieceData.type}`}
          height="65"
          width="65"
        />
        <CharacterImg
          className="Char"
          characterName={pieceData.char}
          height="35"
          width="35"
        />
      </div>}
    </div>
  );
}
