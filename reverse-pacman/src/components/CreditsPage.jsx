/* eslint-disable react/prop-types */
import './GameOver.css';

function CreditsPage({  setOpenCredits }) {

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
					HIGH SCORE{' '}
				</h2>
				<h2 className=''>
					Credits: Hello there
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
						setOpenCredits(false);
					}}
				>
					Home
				</button>
			</div>
		</div>
	);
}

export default CreditsPage;
