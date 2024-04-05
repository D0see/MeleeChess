import './App.css';
import BoardSelectionApp from './BoardSelection/BoardSelectionApp.js';
import CharacterSelectApp from './CharacterSelection/CharacterSelectApp.js';
import React, {useState} from 'react';
import TheGameApp from './TheGameApp/TheGameApp.js';

const mockTeam = {"white":{"king":"Pichu","queen":"Bowser","rook":"Bowser","bishop":"Bowser","knight":"Bowser","pawn":"Bowser"},"black":{"king":"Bowser","queen":"Bowser","rook":"Bowser","bishop":"Bowser","knight":"Bowser","pawn":"Bowser"}}
const mockArray = [[3,6,6,6,6,6,6,3],[3,2,2,2,2,2,2,3],[3,2,5,5,5,5,2,3],[3,4,2,1,1,2,4,3],[3,4,2,1,1,2,4,3],[3,2,5,5,5,5,2,3],[3,2,2,2,2,2,2,3],[3,6,6,6,6,6,6,3]];

export default function App() {
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

/*
return (
   <TheGameApp board={mockArray} playerTeams={mockTeam} />
)
}

*/