import React, {useState, useEffect} from 'react';
import CharacterImg from '../../Shared/CharacterImg';
import PieceImg from '../../Shared/PieceImg';
import './PlaygroundGrid.css'

export default function PlaygroundGrid({playground, board}) {
  
  return (
    <div className='PlaygroundGrid'>
      {playground.map((arr, i) => arr.map((obj, j) => {return obj !== null ?
        <div className='Box'>
          <div className='CharPiece'>
            <PieceImg className="Piece" pieceName={`${obj.team}_${obj.type}`}/>
            <CharacterImg className="Char" characterName={obj.char}/>
          </div>
        </div>
        : 
        <div className='Box'>
        </div>;
      }))}
    </div>
  )
}
