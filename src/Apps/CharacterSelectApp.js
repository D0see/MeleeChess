import React, {useState, useEffect, createContext} from 'react'
import CharacterSelectScreen from '../containers/CharacterSelect/CharacterSelectScreen';

export const lockButtonContext = createContext();

export default function CharacterSelectScreenApp({setPlayerTeams, setCharacterSelectFinished}) {
    const [className, setClassName] = useState("");
    const [buttonDisabled, setbuttonDisabled] = useState(false);

    const [teamsState, setTeamsState] = useState({"White": null, "Black": null});
    useEffect(() => {
      if(teamsState["Black"] && teamsState["White"]) {
        setbuttonDisabled(true);
        setClassName("Slide-up");
        const timeOut = setTimeout(() => {
          setCharacterSelectFinished(true)
        }, 2500)
        return () => clearTimeout(timeOut);
      }
    }, [teamsState])

    return (
      <>
        <lockButtonContext.Provider value = {buttonDisabled}>
          <CharacterSelectScreen className={className} setPlayerTeams={setPlayerTeams} setTeamsState={setTeamsState}/> 
        </lockButtonContext.Provider>
      </>
    )
}
