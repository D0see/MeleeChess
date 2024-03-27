import React, {useState, useEffect} from 'react'
import StageSelector from './StageSelector'
import BoardDisplay from './BoardDisplay'
import LockStageSelectionButton from '../../components/BoardSelection/LockStageSelectionButton'
import RandomButton from '../../components/Shared/RandomButton'
import './BoardSelectionScreen.css';

import { stages } from '../../utils/StageList'

export default function BoardSelectionScreen({setBoard}) {
  const[selectedStage, setSelectedStage] = useState(stages[0].layout)

  const[newClass, setNewClass] = useState("");
  const[isLocked, setIsLocked] = useState(false);
  useEffect(() => {
    if (isLocked) {
      setNewClass("Slide-up");
      setTimeout(() => {
        setBoard(selectedStage);
      },3500)
    }
  },[isLocked])

  return (
    <div className={`${newClass} BoardSelectionScreen`}>
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
