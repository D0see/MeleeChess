import React from 'react'
import StageSelector from './StageSelector'
import BoardDisplay from './BoardDisplay'
import LockStageSelectionButton from '../components/LockStageSelectionButton.js'

import './BoardSelectionScreen.css';

export default function BoardSelectionScreen({ className, setIsLocked, setSelectedStage, selectedStage }) {
  return (
    <div className={`${className} BoardSelectionScreen`}>
      <h1>Select a board</h1> 
      <BoardDisplay selectedStage={selectedStage}/>
      <StageSelector className="StageSelector" selectedStage={selectedStage} setSelectedStage={setSelectedStage}/>
      <LockStageSelectionButton setIsLocked={setIsLocked} className="LockStageSelectionButton"/>
    </div>
  )
}
