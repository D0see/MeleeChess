import React, {useState} from 'react'
import StageSelector from '../containers/BoardSelection/StageSelector'
import BoardDisplay from '../containers/BoardSelection/BoardDisplay'

import { stages } from '../utils/StageList'

export default function BoardSelectionApp() {
  const[selectedStage, setSelectedStage] = useState(stages[0].layout)

  return (
    <>
      <h1>Select your stage</h1>
      <StageSelector setSelectedStage={setSelectedStage}/> 
      <BoardDisplay selectedStage={selectedStage}/>
      <button className="LockStageButton"/>
    </>
  )
}
