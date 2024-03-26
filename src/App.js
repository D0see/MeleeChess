import './App.css';
import CharacterSelectScreen from './containers/TeamCompScreen/CharacterSelectScreen.js';
import React, {useState, useEffect} from 'react';

// ? Rename App.js CharacterSelectScreenApp.js, create a new App.js container containing this mess, pass it the useState for the teams, prop drill one layer further with it.
// Separate every other modules in other apps.
function App() {
  const [teamsState, setTeamsState] = useState({"White": null, "Black": null});
  const [playerTeams, setPlayerTeams] = useState({"White": null, "Black": null});

  const [className, setClassName] = useState("");
  const [CharacterSelectfinished, setCharacterSelectfinished] = useState(false);

  useEffect(() => {
    if(teamsState["Black"] && teamsState["White"]) {
      setClassName("Slide-up");
      const timeOut = setTimeout(() => {
        setCharacterSelectfinished(true)
      }, 3500)
      return () => clearTimeout(timeOut);
    }
  }, [teamsState])
//Line 27 is just for testing purposes
  return (
    <>
      {!CharacterSelectfinished && <CharacterSelectScreen className={className} setPlayerTeams={setPlayerTeams} setTeamsState={setTeamsState}/>} 
      {CharacterSelectfinished && <p>{JSON.stringify(playerTeams)}</p>}
    </>
  )
}

export default App;
