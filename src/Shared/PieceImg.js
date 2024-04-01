import React from 'react'

export default function PieceImg({pieceName, className, height=50, width=50}) {
  return (
    <img className={className} src={`/images/chesspieces/${pieceName}.png`} alt={`${pieceName}`} style={{height: `${height}px`, width:`${width}px`}}/>
  )
}
