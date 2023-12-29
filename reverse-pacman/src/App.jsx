import React, { useState } from 'react'
import GameArea from "./components/GameArea.jsx";
import './App.css'
import PlayerOne from "./components/PlayerMovement.jsx";

function App() {
  // const [count, setCount] = useState(0)

  return (
      <>
        <PlayerOne />
       <GameArea />
      </>

  )
}

export default App
