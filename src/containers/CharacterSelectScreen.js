import React from 'react';
import PlayerTeamComposition from './PlayerTeamComposition';
import './CharacterSelectScreen.css';

export default function CharacterSelectScreen() {
  return (
    <div className='CharacterSelectScreen'>
        <PlayerTeamComposition playerColor={"White"}/>
        <PlayerTeamComposition playerColor={"Black"}/>
    </div>
  );
}

