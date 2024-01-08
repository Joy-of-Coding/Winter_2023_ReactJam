import './HowToPlay.css';
import './Home.css';
import ArrowKeys from '../assets/arrow_keys.png';
import WASDKeys from '../assets/wasd_keys.png';

function HowToPlay({ showHowTo, setShowHowTo }) {
	if (!showHowTo) return null;

	return (
		<div className='modal'>
			<div className='modal-content'>
				<div>
					<h1>How to Play</h1>
					<h2>Reverse Pac-man is a Couch Co-op game</h2>
					<h3>Objective: Catch Pac-dude as quickly as possible</h3>
					<h3>The more dots Pac-dude eats the more your score drops</h3>
				</div>

				<div
					className='ghost-container'
					style={{
						position: 'absolute',
						left: '50%',
						top: ' 60%',
					}}
				>
					<div>
						<div className='floating-ghost'>
							<div
								className='ghost'
								style={{
									marginRight: '80px',
								}}
							>
								<div className='eyes'></div>
								<div className='skirt'></div>
								<div className='wasd'></div>
							</div>
							<div
								className='ghost2'
								style={{
									marginLeft: '30px',
								}}
							>
								<div className='eyes'></div>
								<div className='skirt'></div>
								<div className='arrows'></div>
							</div>
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							position: 'absolute',
							top: '70%',
							marginTop: '60px',
							justifyContent: 'space-around',
							width: '100%',
							backgroundColor: 'red',
						}}
					>
						<div
							style={{
								marginRight: '120px',
							}}
						>
							<img src={WASDKeys} />
						</div>
						<div>
							<img src={ArrowKeys} />
						</div>
					</div>
				</div>
				<div>
					<button
						onClick={() => {
							setShowHowTo(false);
						}}
						className='close'
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}

export default HowToPlay;
