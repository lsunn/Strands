import React, { useState } from 'react';
import './App.css';

const cell = {
    //letter to be determined
    letter: 'A',
    isSelected: false,
    isFound: false,
};

const numRows = 8;
const numCols = 6;

const createInitialGrid = () => {
    // Initialize an empty array for the grid
    const grid = [];
    for (let row = 0; row < numRows; row++) { 
        // Initialize an empty array for the current row
        const currentRow = [];
        for (let col = 0; col < numCols; col++) {
            currentRow.push({ ...cell });
        }
        //Add the current row to the grid
        grid.push(currentRow);
    }
    return grid;
};

const Cell = ({ cell }) => {
    return (
        <div className="cell">
            {cell.letter}
        </div>
    );
};

function chooseLetter() {
    
};

function Board() {
    const [grid, setGrid] = useState(createInitialGrid());

    return (
        <div className="grid">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                        <Cell key={colIndex} cell={cell} onclick="chooseLetter()"/>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;
