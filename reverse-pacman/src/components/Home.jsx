import './Home.css';

const Home = () => {
    return (
        <div className='home-container'>
            <div className='home-title-container'>
                <h1>Pac-Man</h1>
                <p>(Reversed)</p>
            </div>

            <div className='home-buttons-container'>
                <button className='home-start-button'>
                   Start Game
                </button>
                <button className='home-howTo-button'>How To Play</button>
            </div>
        </div>
    );
};

export default Home;

