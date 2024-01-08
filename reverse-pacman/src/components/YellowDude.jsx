import { useState, useEffect } from 'react';
import maze from '../utils/data';
import './PlayerMovement.css';
import { useSound } from '../utils/SoundContext';

function YellowDude({
	boardRows,
	boardColumns,
	cellSize,
	updateMazeState,
	isGameOver,
	setIsGameOver,
	setScore,
	player1Position,
	player2Position,
}) {
	const pixelToGrid = (pixel) => Math.floor(pixel / cellSize);
	const pacmanStart = { top: 14, left: 1 };
	const [target, setTarget] = useState(null);
	const [path, setPath] = useState([]);
	const [pacmanPosition, setPacmanPosition] = useState({
		top: pacmanStart.top * cellSize,
		left: pacmanStart.left * cellSize,
	});

	const { playMunchSound, playDeathSound } = useSound();
	// const munchSound = new Audio(MunchSound);
	// const deathSound = new Audio(DeathSound);

	function getNeighbors(maze, position) {
		const [row, col] = position;
		const neighbors = [];

		// Directions: Up, Right, Down, Left
		const directions = [
			[-1, 0], // Up
			[0, 1], // Right
			[1, 0], // Down
			[0, -1], // Left
		];

		for (let [dr, dc] of directions) {
			const newRow = row + dr;
			const newCol = col + dc;

			if (
				newRow >= 0 &&
				newRow < maze.length &&
				newCol >= 0 &&
				newCol < maze[0].length
			) {
				if (maze[newRow][newCol].type === 'path') {
					neighbors.push([newRow, newCol]);
				}
			}
		}
		return neighbors;
	}

	function dfsFindPath(maze, start, target, path = [], visited = new Set()) {
		// Convert position to string for easy comparison and storage
		const posKey = start.toString();

		// Mark the current cell as visited
		visited.add(posKey);

		// Add the current position to the path
		path.push(start);

		// Check if the current cell is the target
		if (arraysEqual(start, target)) {
			return path;
		}

		// Get neighbors
		const neighbors = getNeighbors(maze, start);

		for (let neighbor of neighbors) {
			const neighborKey = neighbor.toString();

			// Explore unvisited neighbor
			if (!visited.has(neighborKey)) {
				const result = dfsFindPath(maze, neighbor, target, path, visited);
				if (result) {
					return result;
				}
			}
		}

		// Backtrack if dead end is reached
		path.pop();
		return null;
	}

	function arraysEqual(a, b) {
		if (!a || !b) return false; // Check for null or undefined arrays
		return a.length === b.length && a.every((val, index) => val === b[index]);
	}

	useEffect(() => {
		// Set initial target
		updateTarget();
	}, []);

	const findClosestDot = () => {
		let closestDot = null;
		let minDistance = Infinity;
		const currentPos = [
			pixelToGrid(pacmanPosition.top),
			pixelToGrid(pacmanPosition.left),
		];

		for (let row = 0; row < maze.length; row++) {
			for (let col = 0; col < maze[row].length; col++) {
				if (maze[row][col].type === 'path' && maze[row][col].hasDot) {
					const distance =
						Math.abs(row - currentPos[0]) + Math.abs(col - currentPos[1]);
					if (distance < minDistance) {
						closestDot = [row, col];
						minDistance = distance;
					}
				}
			}
		}
		return closestDot;
	};

	// Function to check if all dots are eaten
	const checkAllDotsEaten = () => {
		return maze.every((row) =>
			row.every((cell) => cell.type !== 'path' || !cell.hasDot)
		);
	};

	// Function to check for collision
	function checkCollision(playerPosition, pacmanPosition) {
		// Convert pixel positions to grid positions for comparison
		const playerGridPosition = {
			top: pixelToGrid(playerPosition.top),
			left: pixelToGrid(playerPosition.left),
		};

		// Comparing grid positions for collision
		return (
			playerGridPosition.top === pacmanPosition.top &&
			playerGridPosition.left === pacmanPosition.left
		);
	}

	const movePacman = () => {
		if (!isGameOver && path && path.length > 0) {
			let nextPosition = path.shift();
			const [nextRow, nextCol] = nextPosition;
			// Wrap-around logic for left and right edges
			if (nextCol < 0) {
				nextPosition = [nextRow, maze[0].length - 1]; // Wrap to right side
			} else if (nextCol >= maze[0].length) {
				nextPosition = [nextRow, 0]; // Wrap to left side
			}

			if (maze[nextRow][nextCol] && maze[nextRow][nextCol].hasDot) {
				updateMazeState(nextRow, nextCol); // Consume the dot
				setScore((prevState) => prevState - 4);
				playMunchSound();

				if (checkAllDotsEaten()) {
					setIsGameOver(true);
				}
			}

			// Update the position of pacman
			const newPacmanPosition = {
				top: nextPosition[0] * cellSize,
				left: nextPosition[1] * cellSize,
			};

			// Set the new position
			setPacmanPosition(newPacmanPosition);

			// Convert pacman's pixel position to grid position for collision check
			const pacmanGridPosition = {
				top: nextPosition[0],
				left: nextPosition[1],
			};

			// Check for collisions
			if (
				checkCollision(player1Position, pacmanGridPosition) ||
				checkCollision(player2Position, pacmanGridPosition)
			) {
				setIsGameOver(true);
				playDeathSound();
			}

			if (maze[nextRow][nextCol] && maze[nextRow][nextCol].hasDot) {
				updateMazeState(nextRow, nextCol); // Consume the dot
				setScore((prevState) => prevState - 4);
				if (checkAllDotsEaten()) {
					setIsGameOver(true); // Set game over if all dots are eaten
				}
			}
		} else if (!isGameOver) {
			const newTarget = findClosestDot();
			if (newTarget) {
				setTarget(newTarget);
				const newPath = dfsFindPath(
					maze,
					[pixelToGrid(pacmanPosition.top), pixelToGrid(pacmanPosition.left)],
					newTarget
				);
				setPath(newPath);
			}
		}
	};
	const updateTarget = () => {
		const newTarget = [
			Math.floor(Math.random() * boardRows),
			Math.floor(Math.random() * boardColumns),
		];

		if (maze[newTarget[0]][newTarget[1]] === 0) {
			setTarget(newTarget);
		}
	};

	useEffect(() => {
		// Set initial target
		updateTarget();
	}, []);

	useEffect(() => {
		// Initialize DFS from Pac-Man's position to find a path to the target
		const initialPath = dfsFindPath(
			maze,
			[pixelToGrid(pacmanPosition.top), pixelToGrid(pacmanPosition.left)],
			target
		);

		setPath(initialPath);
	}, [target]);

	useEffect(() => {
		if (target) {
			const initialPath = dfsFindPath(
				maze,
				[pixelToGrid(pacmanPosition.top), pixelToGrid(pacmanPosition.left)],
				target
			);
			setPath(initialPath);
		}
	}, [target]);

	useEffect(() => {
		const intervalId = setInterval(movePacman, 100); // Adjusted interval
		return () => clearInterval(intervalId);
	}, [path, isGameOver, player1Position, player2Position]);
	return (
		<>
			<div //pacman arrives //
				className='pac'
				style={{
					top: pacmanPosition.top + 'px',
					left: pacmanPosition.left + 'px',
					width: cellSize + 'px',
					height: cellSize + 'px',
					position: 'absolute',
				}}
			/>
		</>
		// Deleted Blinky and Clyde //
	);
}

export default YellowDude;
