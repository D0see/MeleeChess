import React from 'react'
import PlaygroundGrid from './containers/PlaygroundGrid.js'

export default function TheGameApp({board, playerTeams}) {
  return (
    <>
    <h1>Player One turn</h1>
    <PlaygroundGrid board={board} playerTeams={playerTeams}/>
    </>
  )
}
