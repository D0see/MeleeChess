import React, {useState, useEffect} from 'react'
import CharacterSelectScreen from '../containers/TeamCompScreen/CharacterSelectScreen';

export default function CharacterSelectScreenApp({setPlayerTeams, setCharacterSelectFinished}) {
    const [teamsState, setTeamsState] = useState({"White": null, "Black": null});
    
  
    const [className, setClassName] = useState("");

  
    useEffect(() => {
      if(teamsState["Black"] && teamsState["White"]) {
        setClassName("Slide-up");
        const timeOut = setTimeout(() => {
          setCharacterSelectFinished(true)
        }, 3500)
        return () => clearTimeout(timeOut);
      }
    }, [teamsState])
  //Line 27 is just for testing purposes
    return (
      <>
        <CharacterSelectScreen className={className} setPlayerTeams={setPlayerTeams} setTeamsState={setTeamsState}/> 
      </>
    )
}
