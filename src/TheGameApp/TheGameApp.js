import React, {useState, createContext} from 'react'
import PlaygroundGrid from './containers/PlaygroundGrid.js'
import populatePlayground from '../utils/PopulatePlayground.js'
import PieceClass from '../utils/PieceClass';


const emptyPlayground = populatePlayground.twoDArrayBuilder(8);
export const gameState = createContext();

export default function TheGameApp({board, playerTeams}) {
  const [stageColorVisible, setStageColorVisible] = useState(false);
  const handleChangeColorClick = () => {
    setStageColorVisible((prev) => !prev);
  }

  const [isWhitesTurn, setIsWhitesTurn] = useState(true);
  const [playground, setPlayground] = useState(populatePlayground.populate(emptyPlayground, playerTeams, PieceClass));

  return (
    <>
      <gameState.Provider value={{playerTeams, isWhitesTurn}}>
        <PlaygroundGrid playground={playground} 
                        setPlayground={setPlayground} 
                        isWhitesTurn={isWhitesTurn}
                        setIsWhitesTurn={setIsWhitesTurn}
                        board={board}
                        stageColorVisible={stageColorVisible}
                        />
      </gameState.Provider >
      <button onClick={handleChangeColorClick} />
    </>
  )
}

