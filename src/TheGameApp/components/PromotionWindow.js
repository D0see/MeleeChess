import React, {useContext} from 'react'
import styles from './PromotionWindow.module.css';
import PieceImg from '../../Shared/PieceImg';
import CharacterImg from '../../Shared/CharacterImg';

import { gameState } from '../TheGameApp'
import { promotionChoiceSetter } from '../containers/PlaygroundGrid'; 

export default function PromotionWindow() {
    const gameInfos = useContext(gameState);
    const setPromotionChoice = useContext(promotionChoiceSetter);
    const turnColor = gameInfos.isWhitesTurn ? "white" : "black";
    const listOfPossiblePromotions = ["rook", "knight", "bishop", "queen"];
    console.log(gameInfos, turnColor);
    console.log(promotionChoiceSetter);
    function handleClick(piece) {
        setPromotionChoice(piece);
    }

  return (
    <div className={styles.PromotionWindow}>
        <div className={turnColor === "white" ? styles.PromotionCoreWhite :  styles.PromotionCoreBlack}> 
            {listOfPossiblePromotions.map((piece, i) => {
                return (
                <div key={i} className={styles.CharPiece} onClick={() => handleClick(piece)}>
                    <PieceImg className={styles.Piece} pieceName={`${turnColor}_${piece}`} height="65" width="65" />
                    <CharacterImg className={styles.Char} characterName={`${gameInfos.playerTeams[turnColor][piece]}`} height="35" width="35" />
                </div>
                )
            })}
        </div>  
    </div>
  )
}
