import { useState, useEffect } from 'react';

let moveBy = 10;
function PlayerMovement() {
	// Player 1
	const [top, setTop] = useState(100);
	const [left, setLeft] = useState(100);

	// Player 2
	const [top2, setTop2] = useState(100);
	const [left2, setLeft2] = useState(100);

	console.log(top, left);

	useEffect(() => {
		document.addEventListener('keydown', characterMovement);

		return () => {
			document.removeEventListener('keydown', characterMovement);
		};
	}, []);

	const characterMovement = (event) => {
		console.log('Key pressed');
		switch (event.key) {
			case 'w': //up
				setTop((prevState) => prevState - moveBy);
				break;
			case 'a': //left
				setLeft((prevState) => prevState - moveBy);
				break;
			case 's': //down
				setTop((prevState) => prevState + moveBy);
				break;
			case 'd': //right
				setLeft((prevState) => prevState + moveBy);
				break;
			case 'ArrowUp': //up
				setTop2((prevState) => prevState - moveBy);
				break;
			case 'ArrowLeft': //left
				setLeft2((prevState) => prevState - moveBy);
				break;
			case 'ArrowDown': //down
				setTop2((prevState) => prevState + moveBy);
				break;
			case 'ArrowRight': //right
				setLeft2((prevState) => prevState + moveBy);
				break;
			default:
				console.log('hello world');
				break;
		}
	};

	return (
		<>
			<div
				className='element'
				style={{
					top: top + 'px',
					left: left + 'px',
					width: '10px',
					height: '10px',
					position: 'relative',
					backgroundColor: 'red',
				}}
			/>
			<div
				className='element'
				style={{
					top: top2 + 'px',
					left: left2 + 'px',
					width: '10px',
					height: '10px',
					position: 'relative',
					backgroundColor: 'blue',
				}}
			/>
		</>
	);
}

export default PlayerMovement;
