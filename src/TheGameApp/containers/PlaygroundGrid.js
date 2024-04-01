import React, {useState, useEffect} from 'react';

import Box from '../components/Box.js'
import { stageColorEnum } from '../../utils/StageList';
import './PlaygroundGrid.css'

export default function PlaygroundGrid({playground, board}) {
const [stageColorVisible, setStageColorVisible] = useState(false);

function handleClick() {
  setStageColorVisible(prev => !prev);
}

  return (
    <>
      <div className='PlaygroundGrid'>
        {playground.map((arr, i) => arr.map((obj, j) => {
          const backgroundColor = stageColorVisible ? stageColorEnum[`${board[i][j]}`] : (i+j) % 2 ? "brown" : "white";
          return <Box defaultBackground = {backgroundColor} obj={obj}/>
        }))}
      </div>
      <button onClick={handleClick}/>
    </>
  )
}