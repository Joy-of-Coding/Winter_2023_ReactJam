import './HowToPlay.css'
import './Home.css'

function HowToPlay({showHowTo, setShowHowTo}) {

    if (!showHowTo) return null

    return (
        <div className='modal'>
        <div className='modal-content'>
            <div>
            <h1>How to Play</h1>
            <h2>Reverse Pac-man is a Couch Co-op game</h2>
            <h3>Objective: Catch Pac-dude as quickly as possible</h3>
            <h3>The more dots Pac-dude eats the more your score drops</h3>
            </div>

            <div className='ghost-container'>
                <div className='left'>
                <div className='floating-ghost'>
					<div className='ghost'>
						<div className='eyes'></div>
						<div className='skirt'></div>
                        <div className='wasd'></div>
					</div>
					<div className='ghost2'>
						<div className='eyes'></div>
						<div className='skirt'></div>
                        <div className='arrows'></div>
					</div>
				</div>
                    <div>Key diagram</div>
                </div>
                <div className='right'>
                    <div>Ghost Image</div>
                    <div>Key diagram</div>
                </div>
            </div>
            <div>
            <button onClick={ ()=>{setShowHowTo(false)}} className='close'>Close</button>
            </div>
        </div>
        </div>

    )
}

export default HowToPlay