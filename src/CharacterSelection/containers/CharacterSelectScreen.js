import React from 'react';
import PlayerTeamComposition from './PlayerTeamComposition';
import styles from './CharacterSelectScreen.module.css';

export default function CharacterSelectScreen({setPlayerTeams, setTeamsState, className}) {

  return (
    <div className={`${className} ${styles.CharacterSelectScreen}`}>
        <PlayerTeamComposition playerColor={"white"} setPlayerTeams={setPlayerTeams} setTeamsState={setTeamsState}/>
        <PlayerTeamComposition playerColor={"black"} setPlayerTeams={setPlayerTeams} setTeamsState={setTeamsState}/>
    </div>
  );
}

