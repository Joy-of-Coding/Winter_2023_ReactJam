import { useState } from 'react';
import Home from './components/Home.jsx';
import GameArea from './components/GameArea.jsx';
import './App.css';

function App() {
	const [startGame, setStartGame] = useState(false);
	return (
		<>
			{!startGame && <Home setStartGame={setStartGame} />}
			{startGame && <GameArea setStartGame={setStartGame} />}
		</>
	);
}

export default App
