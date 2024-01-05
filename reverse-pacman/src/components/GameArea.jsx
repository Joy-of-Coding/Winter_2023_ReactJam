import React from 'react'
import './GameArea.css'
import GameOver from "./GameOver.jsx";
function GameArea() {
    const score= 0
    const highScore = 300
    /* Change to state based */
    let isGameOver = true
    return (
        <div className='gameArea'>
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
                { isGameOver ?
                    (<GameOver score={score} highScore={highScore}/>): null
                }
            </div>
        </div>
    )
}

export default GameArea