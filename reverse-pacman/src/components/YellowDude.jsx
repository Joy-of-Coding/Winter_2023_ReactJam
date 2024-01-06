import { useState, useEffect } from 'react';
import maze from '../utils/data';

function YellowDude({ boardRows, boardColumns, cellSize }) {
	const pixelToGrid = (pixel) => Math.floor(pixel / cellSize);
	const pacmanStart = { top: 14, left: 1 };
	const [target, setTarget] = useState(null);
	const [path, setPath] = useState([]);
	const [pacmanPosition, setPacmanPosition] = useState({
		top: pacmanStart.top * cellSize,
		left: pacmanStart.left * cellSize,
	});

	function getNeighbors(maze, position) {
		const [row, col] = position;
		const neighbors = [];
		console.log(neighbors);

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

			// Check if the new position is within the maze bounds
			if (
				newRow >= 0 &&
				newRow < maze.length &&
				newCol >= 0 &&
				newCol < maze[0].length
			) {
				// Check if the new position is not a wall
				if (maze[newRow][newCol] === 0) {
					neighbors.push([newRow, newCol]);
				}
			}
		}

		return neighbors;
	}

	function bfsFindPath(maze, start, target) {
		let queue = [];
		let visited = new Set();
		let path = new Map(); // Local path map for BFS

		queue.push(start);

		visited.add(start.toString()); // Use string representation for easy comparison

		while (queue.length > 0) {
			console.log('queue length > 0');
			let current = queue.shift();

			if (arraysEqual(current, target)) {
				// Function to compare arrays
				console.log('enter');
				return reconstructPath(path, start, target);
			}

			for (let neighbor of getNeighbors(maze, current)) {
				if (!visited.has(neighbor.toString())) {
					queue.push(neighbor);
					visited.add(neighbor.toString());
					path.set(neighbor.toString(), current);
				}
			}
		}

		return []; // Return empty path if target is not reachable
	}

	function arraysEqual(a, b) {
		if (!a || !b) return false; // Check for null or undefined arrays
		return a.length === b.length && a.every((val, index) => val === b[index]);
	}

	function reconstructPath(path, start, target) {
		let current = target;
		let pathStack = [];

		while (!arraysEqual(current, start)) {
			pathStack.push(current);
			current = path.get(current.toString());
		}
		pathStack.push(start);
		pathStack.reverse();
		return pathStack;
	}

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
		const movePacman = () => {
			if (path && path.length > 0) {
				const nextPosition = path.shift();
				if (nextPosition) {
					setPacmanPosition({
						top: nextPosition[0] * cellSize,
						left: nextPosition[1] * cellSize,
					});
				}
			} else {
				// Only recalculate the path if Pac-Man has reached the end of the current path
				const currentGridPos = [
					pixelToGrid(pacmanPosition.top),
					pixelToGrid(pacmanPosition.left),
				];
				if (arraysEqual(currentGridPos, target)) {
					updateTarget(); // Set a new target
				} else {
					// Recalculate the path to the current target
					const newPath = bfsFindPath(maze, currentGridPos, target);
					setPath(newPath);
				}
			}
		};

		const intervalId = setInterval(movePacman, 300); // Move every 500ms
		return () => clearInterval(intervalId);
	}, [pacmanPosition, target, path]); // Remove 'path' from dependencies to avoid unnecessary recalculations

	return (
		<>
			<div //pacman arrives //
				className='element'
				style={{
					top: pacmanPosition.top + 'px',
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
