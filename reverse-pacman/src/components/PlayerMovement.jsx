import { useState, useEffect } from 'react';
import maze from '../utils/data';



// all const prior to this line are used only to calc cell size
//this is the calculated cell size from board dimensions from Game Area
// const cellSize = 14.161290322580646
function PlayerMovement({cellSize, boardRows, boardColumns}) {  //this is correct react syntax despite linting error
	console.log(boardColumns, boardRows, cellSize)
	// const player1Start = {top: 1, left: 1}
	// const player2Start = {top: 15, left: 14}
	// const boardRows = maze.length;
	// const boardColumns = maze[0].length;
	const pixelToGrid = (pixel) => Math.floor(pixel / cellSize);

	const initialPlayerPositions = {
		player1: { top: 15 * cellSize, left: 13 * cellSize }, // for maze[15][13]
		player2: { top: 15 * cellSize, left: 14.5 * cellSize }, // for maze[15][14]

		// player1: { top: player1Start.top * cellSize, left: player1Start.left * cellSize }, // for maze[15][13]
		// player2: { top: player2Start.top * cellSize, left: player2Start.left * cellSize }, // for maze[15][14]
	};

	const [players, setPlayers] = useState(initialPlayerPositions);

	// Check if a move is valid
	const canMoveTo = (newGridRow, newGridCol) => {
		return (
			newGridRow >= 0 &&
			newGridRow < boardRows &&
			newGridCol >= 0 &&
			newGridCol < boardColumns &&
			maze[newGridRow][newGridCol] === 0
		);
	};

	// Function to handle player movement
	const handleMovement = (player, direction) => {
		let { top, left } = players[player];
		if (direction === 'up') top -= cellSize;
		if (direction === 'down') top += cellSize;
		if (direction === 'left') left -= cellSize;
		if (direction === 'right') left += cellSize;

		if (canMoveTo(pixelToGrid(top), pixelToGrid(left))) {
			setPlayers((prev) => ({ ...prev, [player]: { top, left } }));
		}
	};

	useEffect(() => {
		const characterMovement = (event) => {
			switch (event.key) {
				case 'w':
					handleMovement('player1', 'up');
					break;
				case 'a':
					handleMovement('player1', 'left');
					break;
				case 's':
					handleMovement('player1', 'down');
					break;
				case 'd':
					handleMovement('player1', 'right');
					break;
				case 'ArrowUp':
					handleMovement('player2', 'up');
					break;
				case 'ArrowLeft':
					handleMovement('player2', 'left');
					break;
				case 'ArrowDown':
					handleMovement('player2', 'down');
					break;
				case 'ArrowRight':
					handleMovement('player2', 'right');
					break;
				default:
					break;
			}
		};

		document.addEventListener('keydown', characterMovement);
		return () => document.removeEventListener('keydown', characterMovement);
	}, [players]);

	return (
		<>
			<div
				className='element'
				style={{
					top: players.player1.top + 'px',
					left: players.player1.left + -3.5 + 'px',
					// left: players.player1.left + 'px',

					width: cellSize + 'px',
					height: cellSize + 'px',
					position: 'absolute',
					backgroundColor: 'red',
				}}
			/>
			<div
				className='element'
				style={{
					top: players.player2.top + 'px',
					left: players.player2.left + -11 + 'px',
					width: cellSize + 'px',
					height: cellSize + 'px',
					position: 'absolute',
					backgroundColor: 'cyan',
				}}
			/>			
		</>
	);
}

export default PlayerMovement;
