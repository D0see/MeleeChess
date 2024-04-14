import React from 'react';
import { stageColorEnum } from '../../utils/StageList';
import Square from '../components/Square';

import styles from './ColorPicker.module.css';

export default function ColorPicker({pickedColor, setPickedColor}) {

  function handleClick(event) {
    //Handles re-clicking on active color-picker
    if (pickedColor === + event.target.id) {
      setPickedColor(null);
    } else {
      const clickedKey = + event.target.id;
      setPickedColor(clickedKey);
    }
  }

  return (
    <div className={styles.SelectorContainer}>
        {Object.keys(stageColorEnum).map(key => <Square className={`${styles.Square} ${styles.Pickers} ${pickedColor === + key ? styles.Selected : ""}`} 
                                                        key={key} 
                                                        color={stageColorEnum[key]} 
                                                        id={key} 
                                                        onClick={handleClick}
                                                        />)}
    </div>
  )
}
