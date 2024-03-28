import React from 'react'

export default function Square({className, color, id, onClick}) {
  return (
    <div className={className} style={{backgroundColor: color}} id={id} onClick={onClick}></div>
  )
}
