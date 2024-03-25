import React, {useState} from 'react';
import PlayerTeamComposition from './PlayerTeamComposition';
import './CharacterSelectScreen.css';

export default function CharacterSelectScreen({setPlayerTeams, setTeamsState}) {

  return (
    <div className='CharacterSelectScreen'>
        <PlayerTeamComposition playerColor={"White"} setPlayerTeams={setPlayerTeams} setTeamsState={setTeamsState}/>
        <PlayerTeamComposition playerColor={"Black"} setPlayerTeams={setPlayerTeams} setTeamsState={setTeamsState}/>
    </div>
  );
}

