import React from 'react';
import { stageColorEnum } from '../../utils/StageList';
import Square from '../components/Square';

import './ColorPicker.css';

export default function ColorPicker({pickedColor, setPickedColor}) {

    function handleClick(event) {
        const clickedKey = event.target.id;
        setPickedColor(clickedKey);
    }

  return (
    <div className='SelectorContainer'>
        {Object.keys(stageColorEnum).map(key => <Square className={`Square Pickers ${pickedColor === key ? "Selected" : ""}`} 
                                                        key={key} 
                                                        color={stageColorEnum[key]} 
                                                        id={key} 
                                                        onClick={handleClick}
                                                        />)}
    </div>
  )
}
