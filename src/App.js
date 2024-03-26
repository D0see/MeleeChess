import './App.css';
import CharacterSelectApp from './Apps/CharacterSelectApp.js'
import React, {useState} from 'react';

function App() {
  //CharacterSelectApp State
  const [characterSelectFinished, setCharacterSelectFinished] = useState(false);
  //Playerteam composition
  const [playerTeams, setPlayerTeams] = useState({"White": null, "Black": null});
  return (
    <>
      {!characterSelectFinished && <CharacterSelectApp setPlayerTeams={setPlayerTeams} setCharacterSelectFinished={setCharacterSelectFinished}/>}
      {characterSelectFinished && <p>{JSON.stringify(playerTeams)}</p>}
    </>
  )
  
}

export default App;
