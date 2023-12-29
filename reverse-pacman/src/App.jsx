import { useState } from 'react'
import GameArea from "./components/GameArea.jsx";
import './App.css'
import Home from "./components/Home.jsx";

function App() {
  // const [count, setCount] = useState(0)

  return (
      <>
        <Home />
        <GameArea />
      </>
  )
}

export default App
