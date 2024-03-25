import React, {useState, useEffect} from 'react'
import "./PieceCharacterAssociation.css"
import PieceImg from '../../components/TeamCompScreen/PieceImg'
import {SSBMCharactersArray} from '../../utils/CharacterList'

import CharacterSelection from '../../components/TeamCompScreen/CharacterSelection'
import CharacterImg from '../../components/TeamCompScreen/CharacterImg'
import RandomCharacterButton from '../../components/TeamCompScreen/RandomCharacterButton'


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
          <PieceImg className='PieceImage' piece_name={chessPiece}/>
          <CharacterImg className='CharacterImage' character_name={character}/>
        </div>
        <CharacterSelection className={`${disabled ? "CharacterSelection Disabled" : "CharacterSelection"}`} onSelect={setCharacter} charName={character} disabled={disabled}/>
        <RandomCharacterButton className={`${disabled ? "RandomButton Disabled" : "RandomButton"}`}  onClick={handleRandomClick} disabled={disabled}/>
    </div>
  )
}
