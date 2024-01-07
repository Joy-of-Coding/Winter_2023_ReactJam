import './GameOver.css';

function GameOver({ score, highScore_in_storage }) {
	console.log('gameover hs: ', highScore_in_storage);
	return (
		<div className='gameOver'>
			<h1 className=''>GAME OVER</h1>
			<div
				className=''
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-around',
					marginTop: '15px',
				}}
			>
				<h2 className=''>
					YOUR SCORE<span style={{ color: 'yellow' }}> {score}</span>
				</h2>
				<h2 className=''>
					HIGH SCORE{' '}
					<span style={{ color: 'yellow' }}>{highScore_in_storage}</span>
				</h2>
			</div>
		</div>
	);
}

export default GameOver;
