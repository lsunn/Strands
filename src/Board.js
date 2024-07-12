import React, { useState } from 'react';
import './App.css';
import board from './Data.js';
import Cell, {cell as cell} from './Cell.js';


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

    const checkWord = () => {
        const updatedGrid = [...grid];
        if (words.includes(chosenLetters)) {
            setChosenLetters('valid word');
            selectedCells.forEach(({ row, col }) => {
                updatedGrid[row][col].isFound = true;
                updatedGrid[row][col].isThemeWord = true;
                updatedGrid[row][col].isSelected = false;
            });
        } else if (spangram === chosenLetters) {
            selectedCells.forEach(({ row, col }) => {
                updatedGrid[row][col].isFound = true;
                updatedGrid[row][col].isSpangram = true;
                updatedGrid[row][col].isSelected = false;
            });
        } else {
            setChosenLetters('Not in word list');
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
        </div>
    );
};

export default Board;
