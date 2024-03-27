import React, {useState} from 'react'

export default function LockStageSelectionButton({className, setIsLocked}) {
  const [Toggle, setToggle] = useState(false);

  function handleClick() {
    setToggle(true);
    setIsLocked(true);
  }

  return (
    <button className={Toggle ? `${className} LockedSelectionStageButton` : className} onClick={handleClick}/>
  )
}