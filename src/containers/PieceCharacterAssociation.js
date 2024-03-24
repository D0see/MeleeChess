import React, {useState} from 'react'
import "./PieceCharacterAssociation.css"
import PieceImg from '../components/PieceImg'
import {SSBMCharactersArray} from '../utils/CharacterList'

import CharacterSelection from '../components/CharacterSelection'
import CharacterImg from '../components/CharacterImg'
import RandomCharacterButton from '../components/RandomCharacterButton'


export default function PieceCharacterAssociation({chessPiece}) {
    const [character, setCharacter] = useState("Bowser");
    
function handleRandomClick() {
    const randomIndex = Math.floor(Math.random()*SSBMCharactersArray.length);
    setCharacter(SSBMCharactersArray[randomIndex]);
}

  return (
    <div className='PieceCharacterAssociation'>
        <div className='Combo'>
          <PieceImg className='PieceImage' piece_name={chessPiece}/>
          <CharacterImg className='CharacterImage' character_name={character}/>
        </div>
        <CharacterSelection className='CharacterSelection' onSelect={setCharacter} charName={character}/>
        <RandomCharacterButton className='RandomButton' onClick={handleRandomClick}/>
    </div>
  )
}
