import React, {useEffect} from 'react';
import {stages} from '../../utils/StageList.js';

export default function StageSelector({setSelectedStage}) {

  function handleChange(event) {
      const stageIndex= event.target.value;
      setSelectedStage(stages[stageIndex].layout);
  }

  return (
    <>
      <select onChange={handleChange}>
        {stages.map((stage, i) => <option key={i} value={i}>{stage.name}</option>)}
      </select>
    </>
  )
}
