import React from 'react'
import PieceCharacterAssociation from './PieceCharacterAssociation'

import { CHESSWhitePiecesArray, CHESSBlackPiecesArray } from '../utils/PieceList'

export default function PlayerTeamComposition({playerColor}) {
  return (
    <div className='PlayerTeamComposition'>
        <h1>{`${playerColor}, pick your team`}</h1>
        {playerColor=== "White" ? CHESSWhitePiecesArray.map(piece => <PieceCharacterAssociation chessPiece={piece}/>) : null}
        {playerColor=== "Black" ? CHESSBlackPiecesArray.map(piece => <PieceCharacterAssociation chessPiece={piece}/>) : null}
        <button>LOCK COMPOSITION</button>
    </div>
  )
}
