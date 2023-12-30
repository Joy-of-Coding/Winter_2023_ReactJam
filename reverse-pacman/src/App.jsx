import { useState } from 'react';
import Home from './components/Home.jsx';
import GameArea from './components/GameArea.jsx';
import './App.css';
import YellowDude from './components/YellowDude.jsx';

function App() {
	const [startGame, setStartGame] = useState(false);
	return (
		<>
			<YellowDude />
			{!startGame && <Home setStartGame={setStartGame} />}
			{startGame && <GameArea />}
			
		</>
	);
}

export default App;
