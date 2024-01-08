import './Home.css';
import { useState, useEffect } from 'react';
import HowToPlay from "./HowToPlay.jsx";

const Home = ({ setStartGame }) => {
	const [showGameControls, setShowGameControls] = useState(false);
	const [dotsVisibility, setDotsVisibility] = useState(Array(21).fill(true));
	const [showHowTo, setShowHowTo] = useState(false)

	const startGame = () => {
		setStartGame(true);
	};

	const handleHowTo = () => {
		setShowHowTo(true)
	}

	useEffect(() => {
		setTimeout(() => {
			setShowGameControls(true);
		}, 9000);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			const interval = setInterval(() => {
				setDotsVisibility((prevVisibility) => {
					// Count the number of transparent (eaten) dots
					const eatenDots = prevVisibility.filter((v) => !v).length;

					// Stop making dots disappear after the 11th dot
					if (eatenDots >= 10) {
						clearInterval(interval);
						return prevVisibility;
					}

					// Hide the next dot
					const newVisibility = [...prevVisibility];
					const nextDotToHide = newVisibility.findIndex((v) => v);
					if (nextDotToHide !== -1) {
						newVisibility[nextDotToHide] = false;
					}
					return newVisibility;
				});
			}, 300);

			return () => clearInterval(interval);
		}, 1550);
	}, []);

	return (
		<div className='home-container'>
			<HowToPlay showHowTo={showHowTo} setShowHowTo={setShowHowTo} />
			<div className='home-title-container'>
				<h1>Pac-Man</h1>
				<p>(Reversed)</p>
			</div>

			{!showGameControls && (
				<div className='path'>
					<div className='dots'>
						{dotsVisibility.map((isVisible, index) => (
							<div
								key={index}
								className='dot'
								style={{
									backgroundColor: isVisible ? 'white' : 'transparent',
								}}
							></div>
						))}
					</div>
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
				<button className='home-start-button' onClick={startGame}>
					Start Game
				</button>
				<button className='home-howTo-button' onClick={handleHowTo}>How To Play</button>
			</div>

		</div>
	);
};

export default Home;
