import React, {useEffect, useState} from 'react';
import Square from '../components/Square.js'
import { stageColorEnum } from '../../utils/StageList';
import ColorPicker from './ColorPicker.js';

import './BoardDisplay.css'

export default function BoardDisplay({selectedStage}) {
  const [pickedColor, setPickedColor] = useState(null)
  //for test purposes
  useEffect(() => {
    console.log(pickedColor);
  },[pickedColor])

  return (
    <>
      <div className="Grid">
        {(selectedStage.layout).map(arr => arr.map((num, i) => <Square className='Square' key={i} color={stageColorEnum[num]}/>))}
      </div> 
      <ColorPicker pickedColor={pickedColor} setPickedColor={setPickedColor}/>
    </>
  )
}
