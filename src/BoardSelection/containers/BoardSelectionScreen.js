import React from 'react'
import StageSelector from './StageSelector'
import BoardDisplay from './BoardDisplay'
import LockStageSelectionButton from '../components/LockStageSelectionButton.js'

import styles from  './BoardSelectionScreen.module.css';

export default function BoardSelectionScreen({ className, setIsLocked, setSelectedStage, selectedStage }) {
  return (
    <div className={`${styles.BoardSelectionScreen} ${className}`}>
      <h1>Select a board</h1> 
      <StageSelector className={styles.StageSelector} selectedStage={selectedStage} setSelectedStage={setSelectedStage}/>
      <BoardDisplay selectedStage={selectedStage} setSelectedStage={setSelectedStage}/>
      <LockStageSelectionButton setIsLocked={setIsLocked}/>
    </div>
  )
}
