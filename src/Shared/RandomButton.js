import React from 'react'
import './RandomButton.css'

export default function RandomButton({onClick, className, disabled}) {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>?</button>
  )
}
