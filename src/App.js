import './App.css';
import BoardSelectionApp from './BoardSelection/BoardSelectionApp.js';
import CharacterSelectApp from './CharacterSelection/CharacterSelectApp.js';
import React, {useState} from 'react';
import TheGameApp from './TheGameApp/TheGameApp.js';

function App() {
  //CharacterSelectApp State
  const [characterSelectFinished, setCharacterSelectFinished] = useState(false);
  //Playerteam composition
  const [playerTeams, setPlayerTeams] = useState({"white": null, "black": null});
  //Selected board
  const [board, setBoard] = useState(null);
  return (
    <div className="AppContainer">
      {!characterSelectFinished && <CharacterSelectApp setPlayerTeams={setPlayerTeams} setCharacterSelectFinished={setCharacterSelectFinished}/>}
      {(characterSelectFinished && !board) && <BoardSelectionApp setBoard={setBoard}/>}
      {board && <TheGameApp board={board} playerTeams={playerTeams} />}
    </div>
  )
  
}

export default App;
