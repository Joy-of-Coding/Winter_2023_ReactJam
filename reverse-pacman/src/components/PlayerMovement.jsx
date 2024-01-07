import { useState, useEffect } from 'react';
import maze from '../utils/data';

// all const prior to this line are used only to calc cell size
//this is the calculated cell size from board dimensions from Game Area
// const cellSize = 14.161290322580646
function PlayerMovement({
	cellSize,
	boardRows,
	boardColumns,
	players,
	setPlayers,
}) {
	//this is correct react syntax despite linting error

	// const boardRows = maze.length;
	// const boardColumns = maze[0].length;
	const pixelToGrid = (pixel) => Math.floor(pixel / cellSize);

	// Check if a move is valid
	const canMoveTo = (newGridRow, newGridCol) => {
		return (
			newGridRow >= 0 &&
			newGridRow < boardRows &&
			newGridCol >= 0 &&
			newGridCol < boardColumns &&
			maze[newGridRow][newGridCol].type === 'path'
		);
	};

	// Function to handle player movement
	const handleMovement = (player, direction) => {
		let { top, left } = players[player];
		if (direction === 'up') top -= cellSize;
		if (direction === 'down') top += cellSize;
		if (direction === 'left') left -= cellSize;
		if (direction === 'right') left += cellSize;

		// Wrap around horizontally
		if (left < 0) {
			left = (boardColumns - 1) * cellSize; // Wrap to right side
		} else if (left >= boardColumns * cellSize) {
			left = 0; // Wrap to left side
		}

		// Wrap around vertically (optional)
		if (top < 0) {
			top = (boardRows - 1) * cellSize; // Wrap to bottom
		} else if (top >= boardRows * cellSize) {
			top = 0; // Wrap to top
		}

		if (canMoveTo(pixelToGrid(top), pixelToGrid(left))) {
			setPlayers((prev) => {
				const newPlayers = { ...prev };
				newPlayers[player] = { top, left };
				return newPlayers;
			});
			console.log('players: ', players);
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

	// useEffect(() => {
	// 	console.log('Updated players state:', players);
	// }, [players]);

	return (
		<>
			<div
				className='element'
				style={{
					top: players.player1.top + 'px',
					// left: players.player1.left + -3.5 + 'px',
					left: players.player1.left + 'px',

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
					// left: players.player2.left + -11 + 'px',
					left: players.player2.left + 'px',

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
