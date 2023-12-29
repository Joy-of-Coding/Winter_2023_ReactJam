import React from 'react'
import './GameArea.css'
function GameArea({setStartGame}) {
    const score= 0
    const highScore = 300
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
            <div className='board'>Game Play Area</div>
            <button

                onClick={()=>setStartGame(false)}
            >
                Start Game
            </button>
        </div>
    )
}

export default GameArea
