import React, {useState, useEffect} from 'react'
import styles from "./PieceCharacterAssociation.module.css"
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
    <div className={styles.PieceCharacterAssociation}>
        <div className={disabled ? styles.ComboCentered : styles.Combo}>
          <PieceImg className={styles.PieceImage} pieceName={chessPiece}/>
          <CharacterImg className={styles.CharacterImage} characterName={character}/>
        </div>
        <CharacterSelection className={disabled ? `${styles.Disabled} ${styles.CharacterSelection}` : styles.CharacterSelection} onSelect={setCharacter} charName={character} disabled={disabled}/>
        <RandomButton className={disabled ? styles.Disabled : ""}  onClick={handleRandomClick} disabled={disabled}/>
    </div>
  )
}
