import React from "react";
import CharacterImg from '../../Shared/CharacterImg';
import PieceImg from '../../Shared/PieceImg';
export default function Box({defaultBackground, obj}) {
  return (
    <div className="Box" style={{ backgroundColor: defaultBackground }}>
     {obj &&
      <div className="CharPiece">
        <PieceImg
          className="Piece"
          pieceName={`${obj.team}_${obj.type}`}
          height="65"
          width="65"
        />
        <CharacterImg
          className="Char"
          characterName={obj.char}
          height="35"
          width="35"
        />
      </div>}
    </div>
  );
}
