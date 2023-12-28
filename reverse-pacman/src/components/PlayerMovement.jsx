import React, {useState, useEffect} from 'react'

let moveBy = 10;
function PlayerOne() {
    const [position, setPosition] = useState('');
    console.log(position)
    useEffect(() => {
        window.addEventListener('w', up)
        return ()=> {
            document.removeEventListener('w', up);
        }
    }, []);
    const up = (e) => {
        switch(e.key) {
            case 'w':
                setPosition((position) => position + moveBy + 'px');
                break;
        }
    };

    return (
        <div className="App">
            <div className='element' onKeyPress={(w) => {position}} style={{left: position + '%', width:'10px', height: '10px', position: 'absolute', backgroundColor: 'red'}} />
        </div>
    );
}

export default PlayerOne