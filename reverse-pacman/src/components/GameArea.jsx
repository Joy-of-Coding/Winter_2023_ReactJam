import './GameArea.css';
import PlayerMovement from './PlayerMovement.jsx';
import { usState, useEffect } from 'react';

function GameArea() {
	const score = 0;
	const highScore = 300;

	const boardDimensions = {
		width: 10,
		height: 10,
	};

	const board = Array(boardDimensions.width)
		.fill()
		.map((_, idx) =>
			Array(boardDimensions.height)
				.fill()
				.map((_, index) => index)
		);

	return (
		<div className='gameArea'>
			<div className='score'>
				<div>
					<p>TOP</p>
					<p>{score}</p>
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
				}}
			>
				{board.map((row, i) =>
					row.map((col, j) => (
						<div
							key={j}
							style={{
								border: '1px solid white',
								display: 'flex',
								placeContent: 'center center',
								alignContent: 'center',
								alignItems: 'center',
							}}
						></div>
					))
				)}
				<PlayerMovement />
			</div>
		</div>
	);
}

export default GameArea;
