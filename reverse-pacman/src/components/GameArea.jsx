import React from 'react'
import './GameArea.css'
import PlayerOne from "./PlayerMovement.jsx";
function GameArea() {
    const score= 0
    const highScore = 300

    return (
        <PlayerOne />
        // < className='gameArea'>
        //     <div className='score'>
        //         <div>
        //             <p>TOP</p>
        //             <p>{score}</p>
        //         </div>
        //         <div>
        //             <p>TOP</p>
        //             <p>{highScore}</p>
        //         </div>
        //     </div>
        //     <div className='board'>Game Play Area</div>
        //
        // </div>
    )
}

export default GameArea
