
import './GameArea.css'
import './Maze.jsx'
import Maze from "./Maze.jsx";

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
            <Maze />
        </div>
    );
}

export default GameArea
