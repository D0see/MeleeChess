import React, { useState } from "react";
import CharacterImg from "../../Shared/CharacterImg";
import PieceImg from "../../Shared/PieceImg";

export default function Box({ backgroundColor, pieceData, onClick, isSelected, isPossibleMove, isSelectable }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const numOfStocks = pieceData ? pieceData.stocks : 0;
  const arrOfStocks = [];
  for (let i = 0; i < numOfStocks; i++) {
    arrOfStocks.push(i);
  }

  const handleMouseOver = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  return (
    <div
      className={`Box ${isSelected ? "IsSelected" : ""} ${isSelectable ? "IsSelectable" : ""}`}
      onClick={onClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      style={{ backgroundColor: backgroundColor }}
    >
      {isPossibleMove && (
        <div className="OuterCircle">
          <div className="InnerCircle" style={{ backgroundColor: backgroundColor }}></div>
        </div>
      )}
      {pieceData && (
        <>
          <div className={`CharPiece `}>
            <PieceImg className="Piece" pieceName={`${pieceData.team}_${pieceData.type}`} height="65" width="65" />
            <CharacterImg className="Char" characterName={pieceData.char} height="35" width="35" />
          </div>
          <div className={`DisplayStocks ${isHovered ? "Visible" : ""}`}>
            {arrOfStocks.map((num, i) => {
              return <CharacterImg key={i} className="Stocks" characterName={pieceData.char} height="20" width="20" />;
            })}
          </div>
        </>
      )}
    </div>
  );
}
