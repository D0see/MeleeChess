import React, {useState, useEffect} from 'react'
import BoardSelectionScreen from './containers/BoardSelectionScreen.js';
import { stages } from '../utils/StageList.js';


export default function BoardSelectionApp({setBoard}) {
  const[className, setClassName] = useState("");
  const[selectedStage, setSelectedStage] = useState(stages[0])
  const[isLocked, setIsLocked] = useState(false);
  useEffect(() => {
    if (isLocked) {
      setClassName("Slide-up");
      setTimeout(() => {
        setBoard(selectedStage.layout);
      }, 1500)
    }
  },[isLocked])
  
  return (
    <BoardSelectionScreen className={className} setIsLocked={setIsLocked} setSelectedStage={setSelectedStage} selectedStage={selectedStage}/>
  )
}
