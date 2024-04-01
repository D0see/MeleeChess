import React, {useState, useEffect, createContext} from 'react'
import CharacterSelectScreen from './containers/CharacterSelectScreen';

export const lockButtonContext = createContext();

export default function CharacterSelectScreenApp({setPlayerTeams, setCharacterSelectFinished}) {
    const [className, setClassName] = useState("");
    const [buttonDisabled, setbuttonDisabled] = useState(false);

    const [teamsState, setTeamsState] = useState({"white": null, "black": null});
    useEffect(() => {
      if(teamsState["black"] && teamsState["white"]) {
        setbuttonDisabled(true);
        setClassName("Slide-up");
        const timeOut = setTimeout(() => {
          setCharacterSelectFinished(true)
        }, 1200)
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
