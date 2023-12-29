import  { useState, useEffect } from 'react'
import './PlayerMovement.css'

let moveBy = 20;

function PlayerOne() {
    const [position, setPosition] = useState({ top: 200, left: 80 });

    useEffect(() => {
        const up = (e) => {
            console.log("Up running");
            switch (e.key) {
                case 'w': // up
                    setPosition(currentPosition => ({ ...currentPosition, top: currentPosition.top - moveBy }));
                    break;
                case 'a': // left
                    setPosition(currentPosition => ({ ...currentPosition, left: currentPosition.left - moveBy }));
                    break;
                case 's': // down
                    setPosition(currentPosition => ({ ...currentPosition, top: currentPosition.top + moveBy }));
                    break;
                case 'd': // right
                    setPosition(currentPosition => ({ ...currentPosition, left: currentPosition.left + moveBy }));
                    break;
                // Add additional cases for other keys if necessary
            }
        };

        document.addEventListener('keypress', up);
        return () => {
            document.removeEventListener('keypress', up);
        };
    }, []); //  empty because we're using functional updates

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
