import './GameArea.css';
import PlayerMovement from './PlayerMovement.jsx';
import maze from '../utils/data.js';
import YellowDude from './YellowDude.jsx';

function GameArea(setStartGame) {
	//all constants pulled to top of Game Area
	const cellSize = 15;
	const score = 0;
	const highScore = 300;
	const boardColumns = maze[0].length;
	const boardRows = maze.length;
	const boardWidth = boardColumns * cellSize;
	const boardHeight = boardRows * cellSize;
	const scoreBoardHeight = 55;

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
					row.map((col, j) => (
						<div
							key={`${i} - ${j}`}
							style={{
								// border: '1px solid white',
								// think absolute positioning is the kye to getting ghosts & pacman to align
								// display: 'flex',
								// placeContent: 'center center',
								// alignContent: 'center',
								// alignItems: 'center',

								top: i * cellSize + 'px', //row
								// left: players.player1.left + -3.5 + 'px',
								left: j * cellSize + 'px', // column left edge
								width: cellSize + 'px',
								height: cellSize + 'px',
								position: 'absolute',
								backgroundColor: col === 1 ? 'green' : 'transparent',
							}}
						>
							<div
								className='PacmanFood'
								key={`${i} - ${j}`}
								style={{
									// top: i * cellSize + (cellSize/2 -4)  + 'px', //row
									// left:  j * cellSize + cellSize/2  + 'px', // column left edge
									marginTop: cellSize / 4,
									marginLeft: cellSize / 4,
									width: cellSize / 2 + 'px',
									height: cellSize / 2 + 'px',
									backgroundColor: col === 0 ? 'lightskyblue' : null,
									borderRadius: '50%',
								}}
							/>
						</div>
					))
				)}
				<PlayerMovement
					boardColumns={boardColumns}
					boardRows={boardRows}
					cellSize={cellSize}
				/>
				<YellowDude
					boardColumns={boardColumns}
					boardRows={boardRows}
					cellSize={cellSize}
				/>
			</div>
		</div>
	);
}

export default GameArea;
