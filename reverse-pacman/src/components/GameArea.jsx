import './GameArea.css';
import PlayerMovement from './PlayerMovement.jsx';
import transformedMaze from '../utils/data.js';
import YellowDude from './YellowDude.jsx';
import { useState } from 'react';

function GameArea(setStartGame) {
	//all constants pulled to top of Game Area
	const [maze, setMaze] = useState(transformedMaze); // Initialize maze state at the top

	const cellSize = 15;
	const score = 0;
	const highScore = 300;
	const boardColumns = maze[0].length; // Now maze is initialized
	const boardRows = maze.length;
	const boardWidth = boardColumns * cellSize;
	const boardHeight = boardRows * cellSize;
	const scoreBoardHeight = 55;

	function updateMazeState(row, col) {
		const newMaze = [...maze];
		const cell = { ...newMaze[row][col] }; // Clone the cell to avoid direct mutation

		if (cell.type === 'path' && cell.hasDot) {
			cell.hasDot = false;
			newMaze[row][col] = cell;
			setMaze(newMaze);
		}
	}

	const player1Start = { top: 15, left: 13 };
	const player2Start = { top: 15, left: 14 };
	// const boardRows = maze.length;
	// const boardColumns = maze[0].length;

	const initialPlayerPositions = {
		// player1: { top: 15 * cellSize, left: 13 * cellSize }, // for maze[15][13]
		// player2: { top: 15 * cellSize, left: 14.5 * cellSize }, // for maze[15][14]

		player1: {
			top: player1Start.top * cellSize,
			left: player1Start.left * cellSize,
		}, // for maze[15][13]
		player2: {
			top: player2Start.top * cellSize,
			left: player2Start.left * cellSize,
		}, // for maze[15][14]
	};

	const [players, setPlayers] = useState(initialPlayerPositions);

	const [player1Position, setPlayer1Position] = useState({
		top: players.player1.top,
		left: players.player1.left,
	});
	const [player2Position, setPlayer2Position] = useState({
		top: players.player2.top,
		left: players.player2.left,
	});

	return (
		//set dynamic game area based on board size & cell size
		<div
			className='gameArea'
			style={{
				width: boardWidth,
				height: boardHeight + scoreBoardHeight,
			}}
		>
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
				//no inline styling needed now~
				// style={{

				// width:  boardWidth,
				// height: boardHeight,

				// display: 'grid',
				// gridTemplateColumns: `repeat(${boardColumns}, 1fr)`,
				// gridTemplateRows: `repeat(${boardRows}, 1fr)`,

				// overflow: 'hidden',  //shouldn't need this if math is correct and board size calc from maze
				/*}}*/
			>
				{maze.map((row, i) =>
					row.map((cell, j) => (
						<div
							key={`${i} - ${j}`}
							style={{
								top: i * cellSize + 'px',
								left: j * cellSize + 'px',
								width: cellSize + 'px',
								height: cellSize + 'px',
								position: 'absolute',
								backgroundColor: cell.type === 'wall' ? 'green' : 'transparent',
							}}
						>
							{cell.type === 'path' && cell.hasDot && (
								<div
									className='PacmanFood'
									style={{
										marginTop: cellSize / 4,
										marginLeft: cellSize / 4,
										width: cellSize / 2 + 'px',
										height: cellSize / 2 + 'px',
										backgroundColor: 'lightskyblue',
										borderRadius: '50%',
									}}
								/>
							)}
						</div>
					))
				)}
				<PlayerMovement
					boardColumns={boardColumns}
					boardRows={boardRows}
					cellSize={cellSize}
					players={players}
					setPlayers={setPlayers}
				/>
				<YellowDude
					boardRows={boardRows}
					boardColumns={boardColumns}
					cellSize={cellSize}
					updateMazeState={updateMazeState}
					player1Position={player1Position}
					player2Position={player2Position}
				/>
			</div>
		</div>
	);
}

export default GameArea;
