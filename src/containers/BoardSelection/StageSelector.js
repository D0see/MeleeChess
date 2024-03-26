import React, {useEffect} from 'react';
import {stages} from '../../utils/StageList.js';

export default function StageSelector({setSelectedStage}) {

    useEffect(() => {
     setSelectedStage(stages[0].layout);
    },[]);

    function handleChange(event) {
        const stageIndex= event.target.value;
        setSelectedStage(stages[stageIndex].layout);
    }
  return (
    <>
      <select onChange={handleChange}>
        {stages.map(stage => <option value={stages.indexOf(stage)}>{stage.name}</option>)}
      </select>
    </>
  )
}
