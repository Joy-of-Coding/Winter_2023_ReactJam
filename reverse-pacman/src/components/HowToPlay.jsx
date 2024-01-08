import './HowToPlay.css'
function HowToPlay({showHowTo, setShowHowTo}) {

    if (!showHowTo) return null

    return (
        <div className='modal'>
        <div className='modal-content'>
            <h2>How to Play</h2>
            <h3>Reverse Pac-man is a Couch Co-op game</h3>
            <p>Two players control the ghosts (cyan and red characters)</p>
            <ul>
                <li>Cyan is controlled by w-a-s-d keys</li>
                <li>Red is controlled by up-down-left-right arrow keys</li>
                <li>Objective: Catch Pac-dude as quickly as possible</li>
                <li>The more dots Pac-dude eats the more your score drops</li>

            </ul>

        </div>
            <button onClick={ ()=>{setShowHowTo(false)}} className='close'>Close</button>
        </div>

    )
}

export default HowToPlay