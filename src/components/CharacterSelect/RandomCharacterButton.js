import React from 'react'

export default function RandomCharacterButton({onClick, className, disabled}) {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>?</button>
  )
}
