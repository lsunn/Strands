import './App.css';
import strandsLogo from './images/strandsLogo.svg';
import Board from './Board';
import Banner from './Banner';
import { useState } from 'react';



function App() {
  const [scene, setScene] = useState("beginning");

  return (
    <>
    {scene === "beginning" ? (
      <div className="App">
          <header className="StartScene">
          <img src={strandsLogo} alt="Strands logo" />
          <h1 className="Title">Strands</h1>
          <h2>BETA</h2>
          <p>
              Find hidden words and uncover the day's theme
          </p>

          <button onClick={() => setScene("board")}>Play
          </button>

          <p>Date</p>
          <p>Puzzle by </p>
          </header>
          
      </div>
    ) : null}
    {scene === "board" ? (
      <div className="App">
        <Banner/>
        <Board/>
      </div>
    ) : null}
    </>
  )
}

export default App;
