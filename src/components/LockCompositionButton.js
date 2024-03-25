import React from 'react'

export default function LockCompositionButton({className, onClick}) {

  function handleOnClick(){
    onClick(prev => !prev);
  }

  return (
    <button className={className} onClick={handleOnClick}></button>
  )
}
