import './Home.css';
import { useState, useEffect } from 'react';

const Home = ({ setStartGame }) => {
	const [showGameControls, setShowGameControls] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setShowGameControls(true);
		}, 9000);
	}, []);

	return (
		<div className='home-container'>
			<div className='home-title-container'>
				<h1>Pac-Man</h1>
				<p>(Reversed)</p>
			</div>

			{!showGameControls && (
				<div className='path'>
					<div className='ghost'>
						<div className='eyes'></div>
						<div className='skirt'></div>
					</div>
					<div className='pacman'></div>
				</div>
			)}
			{showGameControls && (
				<div className='floating-ghost'>
					<div className='ghost'>
						<div className='eyes'></div>
						<div className='skirt'></div>
					</div>
					<div className='ghost2'>
						<div className='eyes'></div>
						<div className='skirt'></div>
					</div>
				</div>
			)}

			<div className='home-buttons-container'>
				<button
					className='home-start-button'
					onClick={() => setStartGame(true)}
				>
					Start Game
				</button>
				<button className='home-howTo-button'>How To Play</button>
			</div>
		</div>
	);
};

export default Home;
