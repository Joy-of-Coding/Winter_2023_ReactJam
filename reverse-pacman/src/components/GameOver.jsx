/* eslint-disable react/prop-types */
import './GameOver.css';

function GameOver({ score, highScore_in_storage, setStartGame }) {
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
			<div>
				<button
					style={{
						marginTop: '30px',
						padding: '5px 20px',
						fontSize: '14px',
					}}
					onClick={() => {
						setStartGame(false);
						window.location.reload(true);
					}}
				>
					Home
				</button>
			</div>
		</div>
	);
}

export default GameOver;
