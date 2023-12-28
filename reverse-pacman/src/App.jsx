import { Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import GameArea from './components/GameArea.jsx';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/start-game' element={<GameArea />} />
		</Routes>
	);
}

export default App;
