import React, {useState, useEffect} from 'react'
import "./PieceCharacterAssociation.css"
import PieceImg from '../components/PieceImg'
import {SSBMCharactersArray} from '../utils/CharacterList'

import CharacterSelection from '../components/CharacterSelection'
import CharacterImg from '../components/CharacterImg'
import RandomCharacterButton from '../components/RandomCharacterButton'


export default function PieceCharacterAssociation({chessPiece, addCharacter, disabled}) {
  const [character, setCharacter] = useState("Bowser");

  useEffect(() => {
    addCharacter(prev => ({...prev, [chessPiece]: character}))
  }, [character])
    
function handleRandomClick() {
    const randomIndex = Math.floor(Math.random()*SSBMCharactersArray.length);
    setCharacter(SSBMCharactersArray[randomIndex]);
}

  return (
    <div className="PieceCharacterAssociation">
        <div className={`${disabled ? "Combo ComboCentered" : "Combo"}`}>
          <PieceImg className='PieceImage' piece_name={chessPiece}/>
          <CharacterImg className='CharacterImage' character_name={character}/>
        </div>
        <CharacterSelection className={`${disabled ? "CharacterSelection Disabled" : "CharacterSelection"}`} onSelect={setCharacter} charName={character} disabled={disabled}/>
        <RandomCharacterButton className={`${disabled ? "RandomButton Disabled" : "RandomButton"}`}  onClick={handleRandomClick} disabled={disabled}/>
    </div>
  )
}
