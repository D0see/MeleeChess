import React from "react";
import CharacterImg from '../../Shared/CharacterImg';
import PieceImg from '../../Shared/PieceImg';
export default function Box({backgroundColor, pieceData, onClick, isSelected, IsPossibleMove}) {
  return (
    <div className={`Box ${isSelected ? "IsSelected" : ""}`} onClick = {onClick} style={{ backgroundColor: backgroundColor }}>
      {IsPossibleMove &&
      <div className="OuterCircle">
        <div className="InnerCircle" style={{ backgroundColor: backgroundColor }}></div>
      </div>}
      {pieceData &&
      <div className={`CharPiece`}>
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
