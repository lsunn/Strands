import './App.css';
import Home from './Home';
import Board from './Board';
import Banner from './Banner';
import { useState } from 'react';



function App() {
  const [scene, setScene] = useState("beginning");

  return (
    <div className="App">
      {scene === "beginning" ? (
          <Home setScene={setScene}/>
      ) : (
        <>
          <Banner/>
          <Board/>
        </>
      )}
    </div>
  )
}

export default App;
