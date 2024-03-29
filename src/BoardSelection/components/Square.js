import React from 'react'

export default function Square({className, color, id, onClick, y, x}) {
  return (
    <div className={className} style={{backgroundColor: color}} id={id} onClick={onClick} y={y} x={x}></div>
  )
}
