import React, {useState, useEffect} from 'react'
import BoardSelectionScreen from '../containers/BoardSelection/BoardSelectionScreen.js'
import { stages } from '../utils/StageList.js';


export default function BoardSelectionApp({setBoard}) {
  const[className, setClassName] = useState("");
  const[selectedStage, setSelectedStage] = useState(stages[0].layout)
  const[isLocked, setIsLocked] = useState(false);
  useEffect(() => {
    if (isLocked) {
      setClassName("Slide-up");
      setTimeout(() => {
        setBoard(selectedStage);
      }, 1200)
    }
  },[isLocked])
  
  return (
    <BoardSelectionScreen className={className} setIsLocked={setIsLocked} setSelectedStage={setSelectedStage} selectedStage={selectedStage}/>
  )
}
