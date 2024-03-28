import React from 'react';
import Square from '../components/Square.js'
import { stageColorEnum } from '../../utils/StageList';

import './BoardDisplay.css'

export default function BoardDisplay({selectedStage}) {
  return (
    <div className="Grid">
       {(selectedStage.layout).map(arr => arr.map((num, i) => <Square key={i} color={stageColorEnum[num]}/>))}
    </div> 
  )
}
