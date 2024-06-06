import React from 'react';
import strandsLogo from './images/strandsLogo.png'

function Home() {
    const handlePlayClick = () => {
    };

    return (
    <div className="App">
        <header className="StartScene">
        <img src={strandsLogo} alt="Strands logo" />
        <h1 className="Title">Strands</h1>
        <h2>BETA</h2>
        <p>
            Find hidden words and uncover the day's theme
        </p>

        <button onClick={handlePlayClick}>Play</button>

        <p>Date</p>
        <p>Puzzle by </p>
        </header>
        
    </div>
    );
}

export default Home;