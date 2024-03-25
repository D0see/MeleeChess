import React, {useEffect, useState} from 'react'
import PieceCharacterAssociation from './PieceCharacterAssociation'

import './PlayerTeamComposition.css'

import { CHESSWhitePiecesArray, CHESSBlackPiecesArray } from '../utils/PieceList'
import LockCompositionButton from '../components/LockCompositionButton'

export default function PlayerTeamComposition({playerColor}) {
  const [playerComp, setPlayerComp] = useState({});

  useEffect(() => {
    console.log(playerComp);
  })

  function handleOnClick(){
    
  }

  return (
    <div className='PlayerTeamComposition'>
        <h1>{`${playerColor}, pick your team`}</h1>
        {playerColor=== "White" ? CHESSWhitePiecesArray.map(piece => <PieceCharacterAssociation key={piece} chessPiece={piece} addCharacter={setPlayerComp}/>) : null}
        {playerColor=== "Black" ? CHESSBlackPiecesArray.map(piece => <PieceCharacterAssociation key={piece} chessPiece={piece} addCharacter={setPlayerComp}/>) : null}
        <LockCompositionButton className="LockCompositionButton" onClick={handleOnClick}/>
    </div>
  )
}
