import './App.css';
import BoardSelectionApp from './containers/BoardSelection/BoardSelectionScreen.js';
import CharacterSelectApp from './Apps/CharacterSelectApp.js'
import React, {useState} from 'react';

function App() {
  //CharacterSelectApp State
  const [characterSelectFinished, setCharacterSelectFinished] = useState(false);
  //Playerteam composition
  const [playerTeams, setPlayerTeams] = useState({"White": null, "Black": null});
  //Selected board
  const [board, setBoard] = useState(null);
  return (
    <>
      {!characterSelectFinished && <CharacterSelectApp setPlayerTeams={setPlayerTeams} setCharacterSelectFinished={setCharacterSelectFinished}/>}
      {characterSelectFinished && <BoardSelectionApp setBoard={setBoard}/>}
      {board}
      {board && JSON.stringify(playerTeams)}
    </>
  )
  
}

export default App;
