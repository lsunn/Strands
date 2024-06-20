import React, { useState } from 'react';
import './App.css';
import board from './Data.js';
// import en from 'dictionary-en';
// import nspell from 'nspell';

const cell = {
    //letter to be determined
    letter: 'A',
    isSelected: false,
    isFound: false,
    isThemeWord: false,
    isSpangram: false
};

const numRows = 8;
const numCols = 6;
// const spell = nspell(en)
// console.log(spell.correct('color'))
// console.log(spell.correct('colour'))

const createInitialGrid = () => {
    // Initialize an empty array for the grid
    const grid = [];
    for (let row = 0; row < numRows; row++) { 
        // Initialize an empty array for the current row
        const currentRow = [];
        for (let col = 0; col < numCols; col++) {
            currentRow.push({ ...cell, letter: board.letters[row][col] });
        }
        //Add the current row to the grid
        grid.push(currentRow);
    }
    return grid;
};

const Cell = ({ cell, onClick }) => {
    let backgroundColor = 'white';

    if (cell.isSelected) {
        backgroundColor = "#D8D8C5";
    }

    if (cell.isFound) {
        backgroundColor = cell.isThemeWord ? '#AAE5F2' : cell.isSpangram ? '#EFC929' : null;
    }

    return (
        <div className="cell" onClick={onClick}>
            {cell.letter}
        </div>
    );
};

function Board() {
    const [grid, setGrid] = useState(createInitialGrid());
    const [chosenLetters, setChosenLetters] = useState('');
    
    const handleCellClick = (rowIndex, colIndex) => {
        const updatedGrid = [...grid];
        const clickedCell = updatedGrid[rowIndex][colIndex];

        if (!clickedCell.isSelected) {
            setChosenLetters(prevLetters => prevLetters + cell.letter);
        } else {
            setChosenLetters('');
            // if (!spell.correct(chosenLetters)) {
            //     setChosenLetters('Not in word list');
            // }
            if (board.words.includes(chosenLetters.toLowerCase))
                {
        
                }
            
        }

        cell.isSelected = !cell.isSelected;
    };

    return (
        <div className="grid">
            <h1>{chosenLetters}</h1>
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                        <Cell key={colIndex} cell={cell} onClick={() => handleCellClick(rowIndex, colIndex)}/>
                    ))}
                </div>
            ))}
        </div>
    );
};

console.log("test");

export default Board;
