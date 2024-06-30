import React, { useState } from 'react';
import './App.css';
import board from './Data.js';

const cell = {
    letter: 'A',
    isSelected: false,
    isFound: false,
    isThemeWord: false,
    isSpangram: false
};

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

const Cell = ({ cell, onMouseDown, onMouseEnter, onMouseUp, onClick }) => {
    let backgroundColor = 'white';

    if (cell.isFound) {
        backgroundColor = cell.isThemeWord ? '#AAE5F2' : cell.isSpangram ? '#EFC929' : null;
    } else if (cell.isSelected) {
        backgroundColor = "#D8D8C5";
    } else {
        backgroundColor = null;
    }

    return (
        <div className="cell"
            style={{ backgroundColor }}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            onMouseUp={onMouseUp}>
            {cell.letter}
        </div>
    );
};

function Board() {
    const [grid, setGrid] = useState(createInitialGrid());
    const [chosenLetters, setChosenLetters] = useState('');
    const [selectedCells, setSelectedCells] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [startCell, setStartCell] = useState(null);

    const handleMouseDown = (cell, rowIndex, colIndex) => {
        setStartCell({cell, rowIndex, colIndex});
        setIsDragging(true);
    };

    const handleMouseEnter = (rowIndex, colIndex) => {
        const updatedGrid = [...grid];

        if (isDragging) {
            if(selectedCells.length < 1) {
                if (selectedCells.length === 0) {
                    setChosenLetters('');
                }
                setChosenLetters(prevLetters => prevLetters + startCell.cell.letter);
                setSelectedCells(prevCells => [...prevCells, { row: startCell.rowIndex, col: startCell.colIndex }]);
                startCell.cell.isSelected = true;
                setGrid(updatedGrid);
            }
            handleDragSelect(rowIndex, colIndex);
        }
    };

    const handleMouseUp = (rowIndex, colIndex) => {
        if (isDragging) {
            setIsDragging(false);
            if (startCell.rowIndex === rowIndex && startCell.colIndex === colIndex) {
                handleCellClick(rowIndex, colIndex);
            } else {
                checkWord();
        }
        } else {
            handleCellClick(rowIndex, colIndex);
        }
        setStartCell(null);
    };

    const handleDragSelect = (rowIndex, colIndex) => {
        const updatedGrid = [...grid];
        const cell = updatedGrid[rowIndex][colIndex];

        if (!cell.isSelected) {
            setChosenLetters(prevLetters => prevLetters + cell.letter);
            setSelectedCells(prevCells => [...prevCells, { row: rowIndex, col: colIndex }]);
            cell.isSelected = true;
            setGrid(updatedGrid);
        }
    };

    const handleCellClick = (rowIndex, colIndex) => {
        if (!isDragging) {
            const updatedGrid = [...grid];
            const cell = updatedGrid[rowIndex][colIndex];

            if (selectedCells.length === 0) {
                setChosenLetters('');
            }
            
            if (cell.isSelected) {
                checkWord();
            } else {
                setChosenLetters(prevLetters => prevLetters + cell.letter);
                setSelectedCells(prevCells => [...prevCells, { row: rowIndex, col: colIndex }]);
                cell.isSelected = !cell.isSelected;
            }

            setGrid(updatedGrid);
        }
    };

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
                        <Cell key={colIndex}
                        cell={cell}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        onMouseDown={() => handleMouseDown(cell, rowIndex, colIndex)}
                        onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                        onMouseUp={() => handleMouseUp(rowIndex, colIndex)}/>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;
