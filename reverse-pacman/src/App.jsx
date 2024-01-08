import { useState } from 'react';
import Home from './components/Home.jsx';
import GameArea from './components/GameArea.jsx';
import { SoundProvider } from './utils/SoundContext.jsx';
import SoundControls from './components/SoundControls';
import './App.css';

function App() {
	const [startGame, setStartGame] = useState(false);

	return (
		<SoundProvider>
			<SoundControls />
			{!startGame && <Home setStartGame={setStartGame} />}
			{startGame && <GameArea setStartGame={setStartGame} />}
		</SoundProvider>
	);
}

export default App;
