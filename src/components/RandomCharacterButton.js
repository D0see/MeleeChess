import React from 'react'

export default function RandomCharacterButton({onClick, className}) {
  return (
    <button className={className} onClick={onClick}>?</button>
  )
}
