import './App.css';
import BoardSelectionApp from './Apps/BoardSelectionApp.js';
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
      {characterSelectFinished && <BoardSelectionApp />}
    </>
  )
  
}

export default App;
