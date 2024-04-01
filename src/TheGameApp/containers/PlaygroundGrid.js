import React, {useState, useEffect} from 'react';
import populatePlayground from '../../utils/PopulatePlayground';
import PieceClass from '../../utils/PieceClass';


export default function PlaygroundGrid({board, playerTeams}) {
    const [playground, setPlayground] = useState(populatePlayground.twoDArrayBuilder(8));
useEffect(() => {
    setPlayground(prev => populatePlayground.populate(prev, playerTeams, PieceClass));
}, [])


  return (
    <>
        {JSON.stringify(playground)}
    </>
  )
}
