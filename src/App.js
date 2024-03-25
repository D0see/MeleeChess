import './App.css';
import CharacterSelectScreen from './containers/CharacterSelectScreen';
import React, {useState, useEffect} from 'react';


function App() {
  const [teamsState, setTeamsState] = useState({"White": null, "Black": null});
  const [playerTeams, setPlayerTeams] = useState({"White": null, "Black": null});

  useEffect(() => {
    console.log(playerTeams);
    console.log(teamsState);
  })

  if(teamsState["Black"] && teamsState["White"]) {
    return (
      <p>{JSON.stringify(playerTeams)}</p>
    )
  } else {
    return (
      <CharacterSelectScreen setPlayerTeams={setPlayerTeams} setTeamsState={setTeamsState}/>
    );
  }
}

export default App;
