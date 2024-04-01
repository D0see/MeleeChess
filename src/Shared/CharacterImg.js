import React from 'react'

export default function CharacterImg({characterName, className, height=35, width=35}) {
    return (
      <img className={className} src={`/images/stockicons/${characterName}.png`} alt={`${characterName}`} style={{height: `${height}px`, width:`${width}px`}}/>
    )
}
