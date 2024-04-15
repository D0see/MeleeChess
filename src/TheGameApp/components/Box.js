import React, { useState } from "react";
import CharacterImg from "../../Shared/CharacterImg";
import PieceImg from "../../Shared/PieceImg";
import PromotionWindow from "./PromotionWindow";

import styles from './Box.module.css';

export default function Box({ backgroundColor, pieceData, onClick, isSelected, isPossibleMove, isSelectable, hasPromotionWindow }) {
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
    <div>
      <div
        className={`${styles.Box} ${isSelected ? styles.IsSelected : ""} ${isSelectable ? styles.IsSelectable : ""}`}
        onClick={onClick}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        style={{ backgroundColor: backgroundColor }}
      >
        {isPossibleMove && (
          <div className={styles.OuterCircle}>
            <div className={styles.InnerCircle} style={{ backgroundColor: backgroundColor }}></div>
          </div>
        )}
        {pieceData && (
          <>
            <div className={styles.CharPiece}>
              <PieceImg className={styles.Piece} pieceName={`${pieceData.team}_${pieceData.type}`} height="65" width="65" />
              <CharacterImg className={styles.Char} characterName={pieceData.char} height="35" width="35" />
            </div>
            <div className={`${styles.DisplayStocks} ${isHovered ? styles.Visible : ""}`}>
              {arrOfStocks.map((num, i) => {
                return <CharacterImg key={i} className={styles.Stocks} characterName={pieceData.char} height="20" width="20" />;
              })}
            </div>
          </>
        )}
      </div>
      {hasPromotionWindow && <PromotionWindow />}
    </div>
  );
}
