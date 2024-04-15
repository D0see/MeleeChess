import React, {useContext} from 'react'
import styles from './PromotionWindow.module.css';
import PieceImg from '../../Shared/PieceImg';
import CharacterImg from '../../Shared/CharacterImg';
import { gameState } from '../TheGameApp'



export default function PromotionWindow({onClick}) {
    const gameInfos = useContext(gameState);
    const turnColor = gameInfos.isWhitesTurn ? "white" : "black";
    const listOfPossiblePromotions = ["rook", "knight", "bishop", "queen"];
    console.log(gameInfos, turnColor);

    function handleClick(piece) {
        //
    }

  return (
    <div className={styles.PromotionWindow}>
        <div className={turnColor === "white" ? styles.PromotionCoreWhite :  styles.PromotionCoreBlack}> 
            {listOfPossiblePromotions.map((piece) => {
                return (
                <div className={styles.CharPiece}>
                    <PieceImg className={styles.Piece} pieceName={`${turnColor}_${piece}`} height="65" width="65" />
                    <CharacterImg className={styles.Char} characterName={`${gameInfos.playerTeams[turnColor][piece]}`} height="35" width="35" />
                </div>
                )
            })}
        </div>  
    </div>
  )
}
