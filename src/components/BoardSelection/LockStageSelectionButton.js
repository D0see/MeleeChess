import React, {useState} from 'react'

export default function LockStageSelectionButton({className}) {
  const [Toggle, setToggle] = useState(false);

  function handleClick() {
    setToggle(true);
  }

  return (
    <button className={Toggle ? `${className} LockedSelectionStageButton` : className} onClick={handleClick}/>
  )
}
