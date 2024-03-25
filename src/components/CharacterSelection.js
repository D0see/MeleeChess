import React from 'react'
import {SSBMCharactersObj} from '../utils/CharacterList'

export default function CharacterSelection({onSelect, charName, className}) {

    function handleChange(event) {
        onSelect(event.target.value);
    }

  return (
    <>
    <form>
        <select className={className} onChange={handleChange} value={charName}>
            {Object.keys(SSBMCharactersObj).map(character => {
                return <option key={character} value={character}>{character}</option>
            })}
        </select>
    </form>
</>
  )
}
