import React, { useState } from 'react';
import './App.css';
import board from './Data.js';
import Cell, {cell as cell} from './Cell.js';
import Hint from './Hint.js';

var checkWord = require('check-if-word'),
    word = checkWord('en');

let words = board.words;
let spangram = board.spangram;

const numRows = 8;
const numCols = 6;

const createInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < numRows; row++) { 
        const currentRow = [];
        for (let col = 0; col < numCols; col++) {
            currentRow.push({ ...cell, letter: board.letters[row][col] });
        }
        grid.push(currentRow);
    }
    return grid;
};


function Board() {
    const [grid, setGrid] = useState(createInitialGrid());
    const [chosenLetters, setChosenLetters] = useState('');
    const [selectedCells, setSelectedCells] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [startCell, setStartCell] = useState(null);
    //number of hints user has unused 
    const [numHints, setNumHints] = useState(0); 
    //number of hint words the user has found 
    const [numExtraWords, setNumExtraWords] = useState(0); 
    //words used for hints already 
    const [foundHints, setFoundHints] = useState([]); 
    
    const increaseExtraWords = () => {
        setNumExtraWords(prev => prev + 1);
        setFoundHints(prevCells => [...prevCells, chosenLetters]);
    }


    const revealHint = () => {
        const updatedGrid = grid.map(row => row.map(cell => ({ ...cell })));
        const randomWord = Math.floor(Math.random() * words.length);
        const wordObj = words[randomWord];
        wordObj.positions.forEach(positions => {
            updatedGrid[positions.row][positions.col].isHint = true;
        })
        setNumExtraWords(0);
        setGrid(updatedGrid);
    };

    const checkWord = () => {
        const updatedGrid = [...grid];
        if (words.some(wordObj => wordObj.word === chosenLetters)){
            setChosenLetters('valid word');
            selectedCells.forEach(({ row, col }) => {
                updatedGrid[row][col].isFound = true;
                updatedGrid[row][col].isThemeWord = true;
                updatedGrid[row][col].isSelected = false;
            });
            words = words.filter(wordObj => wordObj.word !== word);
        } else if (spangram === chosenLetters) {
            selectedCells.forEach(({ row, col }) => {
                updatedGrid[row][col].isFound = true;
                updatedGrid[row][col].isSpangram = true;
                updatedGrid[row][col].isSelected = false;
            });
        } else {
            if (word.check(chosenLetters) & chosenLetters.length > 3) {
                if(!foundHints.includes(chosenLetters)) {
                    increaseExtraWords();
                } else {
                    setChosenLetters('Already found');
                }
                setChosenLetters('');
            } else if (chosenLetters.length <= 3) {
                setChosenLetters('Too short');
            } else {
                setChosenLetters('Not in word list');
            }
            selectedCells.forEach(({ row, col }) => {
                updatedGrid[row][col].isSelected = false;
            });
        }
        setSelectedCells([]);
        setGrid(updatedGrid);
    };

    return (
        <div className="grid">
            <h1> {chosenLetters} </h1>
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={rowIndex + colIndex}
                            cell={cell}
                            grid={grid}
                            position={{ rowIndex, colIndex }}
                            isDragging={isDragging}
                            chosenLetters={chosenLetters}
                            selectedCells={selectedCells}
                            startCell={startCell}
                            setGrid={setGrid}
                            setChosenLetters={setChosenLetters}
                            setSelectedCells={setSelectedCells}
                            setIsDragging={setIsDragging}
                            setStartCell={setStartCell}
                            checkWord={checkWord}
                        />
                    ))}
                </div>
            ))}
            <Hint revealHint={revealHint} numHints={numHints} numExtraWords={numExtraWords} />
        </div>
    );
};

export default Board;
