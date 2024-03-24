import React from 'react'

export default function PieceImg({piece_name, className, height=50, width=50}) {
  return (
    <img className={className} src={`/images/chesspieces/${piece_name}.png`} alt={`${piece_name}`} style={{height: `${height}px`, width:`${width}px`}}/>
  )
}
