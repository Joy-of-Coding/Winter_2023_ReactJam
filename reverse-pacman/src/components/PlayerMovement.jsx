import React, {useState, useEffect} from 'react'
import './PlayerMovement.css'

let moveBy = 2;
function PlayerOne() {
    const [position, setPosition] = useState({top:200, left: 80});
    console.log(position)
    useEffect(() => {
        const up = (e) => {
            console.log("Up running")
            switch (e.key) {
                case 'w': // up
                    setPosition(prevState => ({...prevState, top: prevState.top - moveBy}));
                    break;
                case 'a': // left movement
                    setPosition(prevState => ({...prevState, left: prevState.left - moveBy}));
                    break;
            }
        }


        window.addEventListener('keypress', up)
        return ()=> {
            window.removeEventListener('keypress', up);

        }
    }, []);




    return (
        <div className='playerMovement'>
        <div >
            <p>W-A-S-D Key Controls</p>
            <ul>
                <li>W moves up</li>
                <li>A moves left</li>
                <li>S moves down</li>
                <li>D moves right</li>
            </ul>
        </div>
            <div className='character'
                style={{top: `${position}px`}}
            />


        </div>
    );
}

export default PlayerOne


