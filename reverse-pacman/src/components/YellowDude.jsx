import { useState, useEffect } from 'react';
import maze from '../utils/data';


//// Assuming each cell in the grid is 10x10 pixels
// const board_width = 400;
// const board_height = 439;
// const maze_cols = maze[0].length;
// const maze_rows = maze.length;
//
// console.log(maze_cols);
// console.log(maze_rows);
//
//
// //// Calculating the cell size
// const cell_width = board_width / maze_cols;
// const cell_height = board_height / maze_rows;
//
// const cellSize = Math.min(cell_width, cell_height);

function YellowDude({boardRows, boardColumns, cellSize}) {  ///correct syntax despite eslint error
	// const mazeRows = maze.length;
	// const mazeCols = maze[0].length;
	const pixelToGrid = (pixel) => Math.floor(pixel / cellSize);
	const pacmanStart = {top: 14, left: 1}

	// const pacman =  { top: pacmanStart.top * cellSize, left: pacmanStart.left * cellSize }
	const [pacmanPosition, setPacmanPosition] = useState({ top: pacmanStart.top * cellSize, left: pacmanStart.left * cellSize })


	// const [players, setPlayers] = useState(initialPlayerPositions);

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
		let { top, left } = pacmanPosition;
		if (direction === 'up') top -= cellSize;
		if (direction === 'down') top += cellSize;
		if (direction === 'left') left -= cellSize;
		if (direction === 'right') left += cellSize;

		if (canMoveTo(pixelToGrid(top), pixelToGrid(left))) {
			setPacmanPosition((prev)=>({ ...prev,top: top, left: left }));
			// setPlayers((prev) => ({ ...prev, [player]: { top, left } }));

		}
	};

	useEffect(() => {
		const pacmanMovement = (event) => {
			switch (event.key) {
				case 'i':
					handleMovement('player1', 'up');
					break;
				case 'j':
					handleMovement('player1', 'left');
					break;
				case 'k':
					handleMovement('player1', 'down');
					break;
				case 'l':
					handleMovement('player1', 'right');
					break;
			}
		}


		document.addEventListener('keydown', pacmanMovement);
		return () => document.removeEventListener('keydown', pacmanMovement);
	}, [pacmanPosition]);

	return (
		<>			
			<div //pacman arrives //
				className='element'
				style={{
					top: pacmanPosition.top  +'px',
					left: pacmanPosition.left + 'px',
					width: cellSize + 'px',
					height: cellSize + 'px',
					position: 'absolute',
					backgroundColor: 'yellow',
				}}
			/>
		</>
// Deleted Blinky and Clyde // 
	);
}            

export default YellowDude;