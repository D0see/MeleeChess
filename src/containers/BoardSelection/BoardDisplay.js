import React from 'react';
import Square from '../../components/BoardSelection/Square';
import { stageColorEnum } from '../../utils/StageList';

import './BoardDisplay.css'

export default function BoardDisplay({selectedStage}) {
  return (
    <div className="Grid">
       {selectedStage.map(arr => arr.map((num, i) => <Square key={i} color={stageColorEnum[num]}/>))}
    </div> 
  )
}
