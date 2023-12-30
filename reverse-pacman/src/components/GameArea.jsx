import './GameArea.css'
import PlayerMovement from "./PlayerMovement.jsx";

function GameArea() {
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
            <div className='board'>
                <h1>Game Play Area</h1>
                <PlayerMovement />

            </div>

        </div>
    )
}

export default GameArea
