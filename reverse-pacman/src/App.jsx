import React, { useState } from 'react'
import GameArea from "./components/GameArea.jsx";
import './App.css'
import PlayerMovement from "./components/PlayerMovement.jsx";

function App() {
  // const [count, setCount] = useState(0)

  return (
      <>
          <h2>Add Features</h2>
          <h3>Collision Detection</h3>
          <p>Add collision detection to keep the character pixel (red square) inside a chosen boundary areay</p>
          <h3>Co-op Control</h3>
          <p>Add arrow key movements to allow "couch" co-op control from one keyboard</p>

          <PlayerMovement />
        <GameArea />
      </>

  )
}

export default App
