import { useState } from 'react'
import GameArea from "./components/GameArea.jsx";
import './App.css'
import Home from "./components/Home.jsx";

function App() {
  // const [count, setCount] = useState(0)
  const [startGame, setStartGame] = useState(false)

  return (
      <>
        {!startGame &&
          <Home setStartGame={setStartGame}/>
      }
        {startGame &&
            <GameArea setStartGame={setStartGame}/>
        }
      </>
  )
}

export default App
