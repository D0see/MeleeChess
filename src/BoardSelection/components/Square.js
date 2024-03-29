import React from 'react'

export default function Square({className, color, id, onClick, onMouseOver, onMouseDown, onMouseUp, y, x}) {
  return (
    <div className={className} 
         style={{backgroundColor: color}} 
         id={id} 
         onClick={onClick} 
         onMouseOver={onMouseOver} 
         onMouseDown={onMouseDown}
         onMouseUp={onMouseUp}
         y={y} 
         x={x}>
    </div>
  )
}
