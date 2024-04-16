import React, {useContext} from 'react'
import styles from './PromotionWindow.module.css';
import PieceImg from '../../Shared/PieceImg';
import CharacterImg from '../../Shared/CharacterImg';

import { gameState } from '../TheGameApp'
import { promotionLogic } from '../containers/PlaygroundGrid'; 

import Piece from '../../utils/PieceClass';

export default function PromotionWindow() {
    const gameInfos = useContext(gameState);
    const {setSelectedPieceId, setIsWhitesTurn, setPlayground, playground, setPromotionLocation, promotionLocation} = useContext(promotionLogic);
    const turnColor = gameInfos.isWhitesTurn ? "white" : "black";
    const listOfPossiblePromotions = ["rook", "knight", "bishop", "queen"];
    
    function handleClick(piece) {
        const newPlayground = playground.map((arr, rowIndex) =>
            arr.map((pieceData, columnIndex) => {
                if(promotionLocation.y === rowIndex && promotionLocation.x === columnIndex){
                    return new Piece(turnColor, piece, gameInfos.playerTeams[turnColor][piece], rowIndex, columnIndex);
                }
                return pieceData;
            })
        );
        setPlayground(newPlayground);
        setPromotionLocation(null);
        setSelectedPieceId(null);
        setIsWhitesTurn((prev) => !prev);
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
