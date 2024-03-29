import React, {useEffect, useState} from 'react';
import Square from '../components/Square.js'
import { stageColorEnum, stages } from '../../utils/StageList';
import ColorPicker from './ColorPicker.js';

import './BoardDisplay.css'

export default function BoardDisplay({selectedStage, setSelectedStage}) {
  const [pickedColor, setPickedColor] = useState(null);

  const [isCustomBoard, setIsCustomBoard] = useState(false);
  //creates a custom board when a picker is selected and the grid is entered
  function handleGridMouseEnter(){
    if (pickedColor && !isCustomBoard) {
      const customBoard = {name: 'custom board', layout: structuredClone(selectedStage.layout)}; 
      stages.push(customBoard);
      setSelectedStage(stages[stages.indexOf(customBoard)]);
      setIsCustomBoard(true);
      console.log(selectedStage, "on grid enter")
    }
  }
  //painting logic
  function handleSquareClick(y, x) {
    if (selectedStage.name === 'custom board'){
      const updatedLayout= [...selectedStage.layout];
      updatedLayout[y][x] = pickedColor;
      const updatedStage = {...selectedStage, layout: updatedLayout};
      stages[stages.indexOf(selectedStage)] = updatedStage;
      setSelectedStage(updatedStage);
    }
  }

  return (
    <>
      <div className="Grid" onMouseEnter={handleGridMouseEnter}>
        {(selectedStage.layout).map((arr, y) => arr.map((num, x) => <Square className='Square' 
                                                                        key={y*8 + x} 
                                                                        color={stageColorEnum[num]}
                                                                        onClick={() => handleSquareClick(y, x)}
                                                                        />))}
      </div> 
      <ColorPicker pickedColor={pickedColor} setPickedColor={setPickedColor}/>
    </>
  )
}
