import React, { useState } from 'react';
import './App.css';

const cell = {
    letter: 'A',
    isSelected: false,
    isFound: false,
};

const numRows = 8;  // number of rows
const numCols = 6;  // number of columns

const createInitialGrid = () => {
    const grid = []; // Initialize an empty array for the grid
    for (let row = 0; row < numRows; row++) { // Loop through each row
        const currentRow = []; // Initialize an empty array for the current row
        for (let col = 0; col < numCols; col++) { // Loop through each column
            currentRow.push({ ...cell }); // Add a copy of the cell object to the current row
        }
        grid.push(currentRow); // Add the current row to the grid
    }
    return grid; // Return the completed grid
};

const Cell = ({ cell }) => {
    return (
        <div className="cell">
            {cell.letter}
        </div>
    );
};

function Board() {
    const [grid, setGrid] = useState(createInitialGrid());

    return (
        <div className="grid">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                        <Cell key={colIndex} cell={cell} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;
