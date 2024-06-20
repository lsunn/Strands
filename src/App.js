import './App.css';
import Home from './Home';
import Board from './Board';
import Banner from './Banner';
import { useState } from 'react';



function App() {
  const [scene, setScene] = useState("beginning");

  return (
    <>
      {scene === "beginning" ? (
        <div className="App">
          <Home setScene={setScene}/>
        </div>
      ) : (
        <div className="App">
          <Banner/>
          <Board/>
        </div>
      )}
    </>
  )
}

export default App;
