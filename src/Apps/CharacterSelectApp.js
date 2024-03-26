import React, {useState, useEffect} from 'react'
import CharacterSelectScreen from '../containers/CharacterSelect/CharacterSelectScreen';

export default function CharacterSelectScreenApp({setPlayerTeams, setCharacterSelectFinished}) {
    const [className, setClassName] = useState("");
    
    const [teamsState, setTeamsState] = useState({"White": null, "Black": null});
    useEffect(() => {
      if(teamsState["Black"] && teamsState["White"]) {
        setClassName("Slide-up");
        const timeOut = setTimeout(() => {
          setCharacterSelectFinished(true)
        }, 2500)
        return () => clearTimeout(timeOut);
      }
    }, [teamsState])

    return (
      <>
        <CharacterSelectScreen className={className} setPlayerTeams={setPlayerTeams} setTeamsState={setTeamsState}/> 
      </>
    )
}
