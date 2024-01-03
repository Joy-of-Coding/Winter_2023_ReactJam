import './GameArea.css'

import PlayerMovement from "./PlayerMovement.jsx";

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
                    <p>{score}</p>
                </div>
                <div>
                    <p>TOP</p>
                    <p>{highScore}</p>
                </div>
            </div>
            <div className='board'>
            <PlayerMovement />
            </div>
        </div>
    )
}

export default GameArea
