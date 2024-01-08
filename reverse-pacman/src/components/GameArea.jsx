/* eslint-disable react/prop-types */
import './GameArea.css';
import GameOver from './GameOver.jsx';
import PlayerMovement from './PlayerMovement.jsx';
import transformedMaze from '../utils/data.js';
import YellowDude from './YellowDude.jsx';
import { useState, useEffect } from 'react';

function GameArea({ setStartGame }) {
	//all constants pulled to top of Game Area
	const [maze, setMaze] = useState(transformedMaze);

	const cellSize = 15;
	const [score, setScore] = useState(1280);
	const [highScore, setHighScore] = useState(0);

	const highScore_in_storage = JSON.parse(localStorage.getItem('high_score'));
	if (!highScore_in_storage) {
		JSON.stringify(localStorage.setItem('high_score', highScore));
	}

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

	const [players, setPlayers] = useState({
		player1: {
			top: player1Start.top * cellSize,
			left: player1Start.left * cellSize,
		},
		player2: {
			top: player2Start.top * cellSize,
			left: player2Start.left * cellSize,
		},
	});

	const [isGameOver, setIsGameOver] = useState(false);

	useEffect(() => {
		if (isGameOver) {
			if (highScore_in_storage === 0) {
				setHighScore(score);
			}
			//  Update the high score if score is < current high score
			else if (score > highScore_in_storage) {
				JSON.stringify(localStorage.setItem('high_score', score));
			}
		}
	}, [isGameOver]);

	return (
		<div
			className='gameArea'
			style={{
				width: boardWidth,
				height: boardHeight + scoreBoardHeight,
			}}
		>
			<div className='score'>
				<div>
					<p> CURRENT</p>
					<p>{score}</p>
				</div>

				<div>
					<p> RECORD</p>
					<p>{highScore_in_storage}</p>
				</div>
			</div>
			<div className='board'>
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
					player1Position={players.player1}
					player2Position={players.player2}
					isGameOver={isGameOver}
					setIsGameOver={setIsGameOver}
					score={score}
					setScore={setScore}
				/>
				{isGameOver && (
					<GameOver
						score={score}
						highScore_in_storage={highScore_in_storage}
						setHighScore={setHighScore}
						setStartGame={setStartGame}
					/>
				)}
			</div>
		</div>
	);
}

export default GameArea;
