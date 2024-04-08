import React from "react";
import { SSBMCharactersObj } from "../../utils/CharacterList";

export default function CharacterSelection({ onSelect, charName, className, disabled }) {
  function handleChange(event) {
    onSelect(event.target.value);
  }

  return (
    <select className={className} onChange={handleChange} value={charName} disabled={disabled}>
      {Object.keys(SSBMCharactersObj).map((character) => {
        return (
          <option key={character} value={character}>
            {character}
          </option>
        );
      })}
    </select>
  );
}
