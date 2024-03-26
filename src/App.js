import './App.css';
import CharacterSelectApp from './Apps/CharacterSelectApp.js'
import React, {useState} from 'react';

// ? Rename App.js CharacterSelectScreenApp.js, create a new App.js container containing this mess, pass it the useState for the teams, prop drill one layer further with it.
// Separate every other modules in other apps.
function App() {
  return (
    <CharacterSelectApp/>
  )
  
}

export default App;
