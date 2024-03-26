import React from 'react'

export default function LockButton({className, onClick}) {

  function handleOnClick(){
    onClick(prev => !prev);
  }

  return (
    <button className={className} onClick={handleOnClick}></button>
  )
}
