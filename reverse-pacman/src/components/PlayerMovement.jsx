import  { useState, useEffect } from 'react'
import './PlayerMovement.css'

let moveBy = 20;

function PlayerOne() {
    const [position, setPosition] = useState({ top: 200, left: 80 });

    useEffect(() => {
        const changeDirection = (event) => {
            console.log("Up running");
            switch (event.key) {
                case 'w': // up
                    setPosition(currentPosition => ({ ...currentPosition, top: currentPosition.top - moveBy }));
                    break;
                case 'a':
                    // left
                    break;
                case 's': 
                    // down
                    break;
                case 'd':
                    // right
                    break;
                // Add additional cases for 2nd player??
            }
        };

        window.addEventListener('keypress', changeDirection);

        return () => {
            window.removeEventListener('keypress', changeDirection);
        };
    }, []); // still empty because we're using functional updates now

    return (
        <div className='playerMovement'>
            <div>
                <p>W-A-S-D Key Controls</p>
                <ul>
                    <li>W moves up</li>
                    <li>A moves left</li>
                    <li>S moves down</li>
                    <li>D moves right</li>
                </ul>
            </div>
            <div className='character'
                 style={{ top: `${position.top}px`, left: `${position.left}px` }} />
        </div>
    );
}

export default PlayerOne;
