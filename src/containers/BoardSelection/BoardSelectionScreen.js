import React, {useState} from 'react'
import StageSelector from './StageSelector'
import BoardDisplay from './BoardDisplay'
import LockStageSelectionButton from '../../components/BoardSelection/LockStageSelectionButton'
import './BoardSelectionScreen.css';

import { stages } from '../../utils/StageList'

export default function BoardSelectionScreen({className=""}) {
  const[selectedStage, setSelectedStage] = useState(stages[0].layout)

  return (
    <div className={`${className} BoardSelectionScreen`}>
      <h1>Select your stage</h1>
      <StageSelector setSelectedStage={setSelectedStage}/> 
      <BoardDisplay selectedStage={selectedStage}/>
      <LockStageSelectionButton className="LockStageSelectionButton"/>
    </div>
  )
}
