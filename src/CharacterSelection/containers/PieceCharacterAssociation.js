import React, {useState, useEffect} from 'react'
import "./PieceCharacterAssociation.css"
import PieceImg from '../../Shared/PieceImg'
import {SSBMCharactersArray} from '../../utils/CharacterList'

import CharacterSelection from '../components/CharacterSelection'
import CharacterImg from '../../Shared/CharacterImg'
import RandomButton from '../../Shared/RandomButton'


export default function PieceCharacterAssociation({chessPiece, addCharacter, disabled}) {

  const [character, setCharacter] = useState("Bowser");
  useEffect(() => {
    const pieceType = chessPiece.slice(6);
    addCharacter(prev => ({...prev, [pieceType]: character}))
  }, [character])
    
function handleRandomClick() {
    setCharacter(prev => {
      let randomIndex = Math.floor(Math.random()*SSBMCharactersArray.length);
      //Make it so you can't roll the selected character
      while (SSBMCharactersArray.indexOf(prev) === randomIndex){
        randomIndex = Math.floor(Math.random()*SSBMCharactersArray.length);
      }
      return SSBMCharactersArray[randomIndex];    
  })
}
  return (
    <div className="PieceCharacterAssociation">
        <div className={`${disabled ? "Combo ComboCentered" : "Combo"}`}>
          <PieceImg className='PieceImage' pieceName={chessPiece}/>
          <CharacterImg className='CharacterImage' characterName={character}/>
        </div>
        <CharacterSelection className={`${disabled ? "CharacterSelection Disabled" : "CharacterSelection"}`} onSelect={setCharacter} charName={character} disabled={disabled}/>
        <RandomButton className={`${disabled ? "RandomButton Disabled" : "RandomButton"}`}  onClick={handleRandomClick} disabled={disabled}/>
    </div>
  )
}
