import React, {useState} from 'react';
import Square from '../components/Square.js'
import { stageColorEnum, stages } from '../../utils/StageList';
import ColorPicker from './ColorPicker.js';

import './BoardDisplay.css'

export default function BoardDisplay({selectedStage, setSelectedStage}) {
  const [mouseDown, setMouseDown] = useState(false);
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
  function handleMouseOver(y, x) {
    if ((selectedStage.name === 'custom board') && mouseDown){
      const updatedLayout= [...selectedStage.layout];
      updatedLayout[y][x] = pickedColor;
      const updatedStage = {...selectedStage, layout: updatedLayout};
      stages[stages.indexOf(selectedStage)] = updatedStage;
      setSelectedStage(updatedStage);
    }
  }
  //Following function enable 
  function handleMouseDown(y, x){
    setMouseDown(true)
    //repeats mouseover logic so it triggers on the first mousedowned square.
    if ((selectedStage.name === 'custom board')){
      const updatedLayout= [...selectedStage.layout];
      updatedLayout[y][x] = pickedColor;
      const updatedStage = {...selectedStage, layout: updatedLayout};
      stages[stages.indexOf(selectedStage)] = updatedStage;
      setSelectedStage(updatedStage);
    } 
  }

  const handleMouseUp = () => {
    setMouseDown(false);
  }

  const handleGridMouseLeave = () => {
    setMouseDown(false);
  }

  return (
    <>
      <div className="Grid" 
           onMouseEnter={handleGridMouseEnter}
           onMouseLeave={handleGridMouseLeave}>
        {(selectedStage.layout).map((arr, y) => arr.map((num, x) => <Square className='Square' 
                                                                            key={y*8 + x} 
                                                                            color={stageColorEnum[num]}
                                                                            onMouseOver={() => handleMouseOver(y, x)}
                                                                            onMouseDown={() => handleMouseDown(y, x)}
                                                                            onMouseUp={handleMouseUp}
                                                                            />))}
      </div> 
      <ColorPicker pickedColor={pickedColor} setPickedColor={setPickedColor}/>
    </>
  )
}
