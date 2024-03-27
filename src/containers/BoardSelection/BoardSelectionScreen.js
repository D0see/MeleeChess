import React from 'react'
import StageSelector from './StageSelector'
import BoardDisplay from './BoardDisplay'
import LockStageSelectionButton from '../../components/BoardSelection/LockStageSelectionButton'
import RandomButton from '../../components/Shared/RandomButton'
import './BoardSelectionScreen.css';

export default function BoardSelectionScreen({ className, setIsLocked, setSelectedStage, selectedStage }) {
  return (
    <div className={`${className} BoardSelectionScreen`}>
      <h1>Select a board</h1> 
      <BoardDisplay selectedStage={selectedStage}/>
      <div className='SelectorContainer'>
        <StageSelector className="StageSelector" setSelectedStage={setSelectedStage}/>
        <RandomButton className="RandomButton RandomButtonAdjusted"/>
      </div>
      <LockStageSelectionButton setIsLocked={setIsLocked} className="LockStageSelectionButton"/>
    </div>
  )
}
