import React from 'react'

export default function CharacterImg({character_name, className, height=35, width=35}) {
    return (
      <img className={className} src={`/images/stockicons/${character_name}.png`} alt={`${character_name}`} style={{height: `${height}px`, width:`${width}px`}}/>
    )
}
