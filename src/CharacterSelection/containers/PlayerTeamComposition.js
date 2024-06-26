import React, {useEffect, useState} from 'react'
import PieceCharacterAssociation from './PieceCharacterAssociation'

import styles from './PlayerTeamComposition.module.css'

import { CHESSWhitePiecesArray, CHESSBlackPiecesArray } from '../../utils/PieceList'
import LockButton from '../components/LockButton'

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
    <div className={styles.PlayerTeamComposition}>
        <h1>{`${playerColor}, pick your team`}</h1>
        {playerColor=== "white" ? CHESSWhitePiecesArray.map(piece => <PieceCharacterAssociation key={piece} chessPiece={piece} addCharacter={setPlayerComp} disabled={compIsLocked}/>) : null}
        {playerColor=== "black" ? CHESSBlackPiecesArray.map(piece => <PieceCharacterAssociation key={piece} chessPiece={piece} addCharacter={setPlayerComp} disabled={compIsLocked}/>) : null}
        <LockButton className={`${styles.LockCompositionButton} ${compIsLocked ? styles.LockedCompositionButton : ""}`} onClick={setCompIsLocked}/>
    </div>
  )
}
