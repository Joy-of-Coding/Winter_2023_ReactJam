import './GameArea.css';
import PlayerMovement from './PlayerMovement.jsx';
import maze from '../utils/data.js';
import YellowDude from './YellowDude.jsx';


function GameArea( setStartGame ) {

	//all constants pulled to top of Game Area
	const cellSize = 15
	const score = 0;
	const highScore = 300;
	const boardColumns = maze[0].length
	const boardRows = maze.length
	const boardWidth = boardColumns * cellSize
	const boardHeight = boardRows * cellSize


	return (
		//set dynamic game area based on board size & cell size
		<div className='gameArea'
			style={{
				width:  boardWidth,
				height: boardHeight
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
				style={{
					display: 'grid',
					gridTemplateColumns: `repeat(${boardColumns}, 1fr)`,
					gridTemplateRows: `repeat(${boardRows}, 1fr)`,
					backgroundColor: 'lightgray',
					// overflow: 'hidden',  //shouldn't need this if math is correct and board size calc from maze
				}}
			>


				{maze.map((row, i) =>
					row.map((col, j) => (
						<div
							key={`${i} - ${j}`}
							style={{
								// border: '1px solid white',
								display: 'flex',
								placeContent: 'center center',
								alignContent: 'center',
								alignItems: 'center',
								backgroundColor: col === 1 ? 'green' : 'transparent',
							}}
						>
							<div
                                className='PacmanFood'
                                key={`${i} - ${j}`}
                                style={{
                                    height: '2px',
                                    width: '2px',
                                    backgroundColor: col === 0 ? 'red' : null,
                                    borderRadius: '50%',
                                }}
                            />
						</div>
					))
				)}
				<PlayerMovement boardColumns={boardColumns} boardRows={boardRows} cellSize={cellSize}/>
				<YellowDude />
			</div>
		</div>
	);
}

export default GameArea;
