import React from 'react';
import {stages} from '../../utils/StageList.js';
import RandomButton from '../../Shared/RandomButton.js';
import styles from './BoardSelectionScreen.module.css'
import buttonStyle from '../../Shared/RandomButton.module.css'

export default function StageSelector({className, selectedStage, setSelectedStage}) {

  function handleSelect(event) {
      const stageIndex = event.target.value;
      setSelectedStage(stages[stageIndex]);
  }

  function handleClick(){
    let randomStageIndex = Math.floor(Math.random()*stages.length);
    while (stages[randomStageIndex].layout === selectedStage.layout) {
      randomStageIndex = Math.floor(Math.random()*stages.length);
    }
    setSelectedStage(stages[randomStageIndex]);
  }

  return (
    <div className={styles.SelectorContainer}>
      <select className={className} onChange={handleSelect} value={stages.indexOf(selectedStage)}>
        {stages.map((stage, i) => <option key={i} value={i}>{stage.name}</option>)}
      </select>

      <RandomButton className={`${buttonStyle.RandomButton} ${styles.RandomButtonAdjusted}`} onClick={handleClick}/>
    </div>
  )
}
