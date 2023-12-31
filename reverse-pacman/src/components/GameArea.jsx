import React from 'react'
import './GameArea.css'

function GameArea({ setStartGame }) {
    const score = 0
    const highScore = 300
    return (
        <div className='gameArea'>
            <div className='score'>
                <div>
                    <p>To</p>
                    <p>{score}</p>
                </div>
                <div>
                    <button
                        onClick={() => setStartGame(false)}>
                        Home
                    </button>
                </div>
                <div>
                    <p>TOP</p>
                    <p>{highScore}</p>
                </div>
            </div>
            <div className='board'>Game Play Area</div>
            <div className='path1'>
				<div className='ghost1'>
					<div className='eyes1'></div>
					<div className='skirt1'></div>
				</div>
				<div className='pacman1'></div>
            </div>
            <div className='path2'>
				<div className='ghost2'>
					<div className='eyes2'></div>
					<div className='skirt2'></div>
				</div>
				<div className='pacman2'></div>
            </div>
            <div className='path3'>
				<div className='ghost3'>
					<div className='eyes3'></div>
					<div className='skirt3'></div>
				</div>
				<div className='pacman3'></div>
            </div>
            <div className='path4'>
				<div className='ghost4'>
					<div className='eyes4'></div>
					<div className='skirt4'></div>
				</div>
				<div className='pacman4'></div>
            </div>
        </div>
    )
}

export default GameArea

/* original WORKING Code ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import React from 'react'
import './GameArea.css'

function GameArea({ setStartGame }) {
    const score = 0
    const highScore = 300
    return (
        <div className='gameArea'>
            <div className='score'>
                <div>
                    <p>To</p>
                    <p>{score}</p>
                </div>
                <div>
                    <button
                    onClick={() => setStartGame(false)}> 
                        Home
                    </button>
                </div>
                <div>
                    <p>TOP</p>
                    <p>{highScore}</p>
                </div>
            </div>
            <div className='board'>Game Play Area</div>
        </div>
    )
}

export default GameArea
*/

