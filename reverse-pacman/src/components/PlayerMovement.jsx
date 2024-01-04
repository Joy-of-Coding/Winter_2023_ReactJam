import { useState, useEffect } from 'react';
import maze from '../utils/data';

// Assuming each cell in the grid is 10x10 pixels
const board_width = 400;
const board_height = 500;
const maze_cols = maze[0].length;
const maze_rows = maze.length;
console.log(maze_cols);
console.log(maze_rows);

// Calculating the cell size
const cell_width = board_width / maze_cols;
const cell_height = board_height / maze_rows;

const cellSize = Math.min(cell_width, cell_height);

function PlayerMovement() {
	const mazeRows = maze.length;
	const mazeCols = maze[0].length;
	const pixelToGrid = (pixel) => Math.floor(pixel / cellSize);

	const initialPlayerPositions = {
		player1: { top: 15 * cellSize, left: 13 * cellSize }, // for maze[15][13]
		player2: { top: 15 * cellSize, left: 14 * cellSize }, // for maze[15][14]
	};

	const [players, setPlayers] = useState(initialPlayerPositions);

	// Check if a move is valid
	const canMoveTo = (newGridRow, newGridCol) => {
		return (
			newGridRow >= 0 &&
			newGridRow < mazeRows &&
			newGridCol >= 0 &&
			newGridCol < mazeCols &&
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
					top: players.player1.top + -3.5 + 'px',
					left: players.player1.left + -3.5 + 'px',
					width: cellSize + 'px',
					height: cellSize + 'px',
					position: 'absolute',
					backgroundColor: 'red',
				}}
			/>
			<div
				className='element'
				style={{
					top: players.player2.top + -3.5 + 'px',
					left: players.player2.left + -3.5 + 'px',
					width: cellSize + 'px',
					height: cellSize + 'px',
					position: 'absolute',
					backgroundColor: 'blue',
				}}
			/>
		</>
	);
}

export default PlayerMovement;
