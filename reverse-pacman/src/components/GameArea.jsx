import React from 'react'
import './GameArea.css'
import GameOver from "./GameOver.jsx";
function GameArea() {
    const score= 0
    const highScore = 300
    let isGameOver = false
    return (
        <div className='gameArea'>
            {/* Testing div, comment out when going for release, leave in code for easy testing */}
            <div className= 'testingStuff'>
                <button
                    onClick={event =>
                    {GameOver(1, 300);
                    isGameOver = true}}
                >
                    Test Game Over
                </button>
            </div>
            <div className='score'>
                <div>
                    <p>TOP</p>
                    <p>{score}</p>
                </div>
                    <div>
                    <p>TOP</p>
                    <p>{highScore}</p>
                </div>
            </div>
            <div className='board'>Game Play Area
                <div className='gameOver'>

                </div>
            </div>
        </div>
    )
}

export default GameArea
