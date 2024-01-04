import './GameArea.css';
import PlayerMovement from './PlayerMovement.jsx';
import maze from '../utils/data.js';

function GameArea({ setStartGame }) {
	const score = 0;
	const highScore = 300;

	const boardDimensions = {
		width: maze[0].length,
		height: maze.length,
	};

	return (
		<div className='gameArea'>
			<div className='score'>
				<div>
					<p>TOP</p>
					<p>{score}</p>
				</div>
				<div>
					<button onClick={() => setStartGame(false)}>Home</button>
				</div>
				<div>
					<p>TOP</p>
					<p>{highScore}</p>
				</div>
			</div>
			<div
				className='board'
				style={{
					display: 'grid',
					gridTemplateColumns: `repeat(${boardDimensions.width}, 1fr)`,
					gridTemplateRows: `repeat(${boardDimensions.height}, 1fr)`,
					backgroundColor: 'pink',
					overflow: 'hidden',
				}}
			>
				<PlayerMovement />

				{maze.map((row, i) =>
					row.map((col, j) => (
						<div
							key={`${i} - ${j}`}
							style={{
								border: '1px solid white',
								display: 'flex',
								placeContent: 'center center',
								alignContent: 'center',
								alignItems: 'center',
								backgroundColor: col === 1 ? 'green' : 'transparent',
							}}
						></div>
					))
				)}
			</div>
		</div>
	);
}

export default GameArea;
