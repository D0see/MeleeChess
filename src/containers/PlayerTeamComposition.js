import React, {useEffect, useState} from 'react'
import PieceCharacterAssociation from './PieceCharacterAssociation'

import './PlayerTeamComposition.css'

import { CHESSWhitePiecesArray, CHESSBlackPiecesArray } from '../utils/PieceList'
import LockCompositionButton from '../components/LockCompositionButton'

export default function PlayerTeamComposition({playerColor, setPlayerTeams, setTeamsState}) {
  const [playerComp, setPlayerComp] = useState({});
  useEffect(() => {
    setPlayerTeams(prev => ({...prev, [playerColor]: playerComp}) )
  },[playerComp]);

  const [compIsLocked, setCompIsLocked] = useState(false);
  useEffect(() => {
    setTeamsState(prev => ({...prev, [playerColor]: compIsLocked}) )
  },[compIsLocked]);

  return (
    <div className='PlayerTeamComposition'>
        <h1>{`${playerColor}, pick your team`}</h1>
        {playerColor=== "White" ? CHESSWhitePiecesArray.map(piece => <PieceCharacterAssociation key={piece} chessPiece={piece} addCharacter={setPlayerComp} disabled={compIsLocked}/>) : null}
        {playerColor=== "Black" ? CHESSBlackPiecesArray.map(piece => <PieceCharacterAssociation key={piece} chessPiece={piece} addCharacter={setPlayerComp} disabled={compIsLocked}/>) : null}
        <LockCompositionButton className={`LockCompositionButton ${compIsLocked ? `LockedCompositionButton` : ""}`} onClick={setCompIsLocked}/>
    </div>
  )
}
