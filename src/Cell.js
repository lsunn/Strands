import React from 'react';

export const cell = {
    letter: 'A',
    isSelected: false,
    isFound: false,
    isThemeWord: false,
    isSpangram: false,
    isHint: false
};

const Cell = ({
    cell,
    grid,
    position,
    isDragging,
    chosenLetters,
    selectedCells,
    startCell,
    setGrid,
    setChosenLetters,
    setSelectedCells,
    setIsDragging,
    setStartCell,
    checkWord
}) => {
    let backgroundColor = 'white';
    const {rowIndex, colIndex} = position;

    if (cell.isFound) {
        backgroundColor = cell.isThemeWord ? '#AAE5F2' : cell.isSpangram ? '#EFC929' : null;
    } else if (cell.isSelected) {
        backgroundColor = "#D8D8C5";
    } else if (cell.isHint) {
        backgroundColor = 'grey';
    }
    else {
        backgroundColor = null;
    }


    const handleMouseDown = () => {
        setStartCell({cell, rowIndex, colIndex});
        setIsDragging(true);
    };

    const handleMouseEnter = () => {
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

    const handleMouseUp = () => {
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

    const handleDragSelect = () => {
        const updatedGrid = [...grid];
        const cell = updatedGrid[rowIndex][colIndex];

        if (!cell.isSelected) {
            setChosenLetters(prevLetters => prevLetters + cell.letter);
            setSelectedCells(prevCells => [...prevCells, { row: rowIndex, col: colIndex }]);
            cell.isSelected = true;
            setGrid(updatedGrid);
        }
    };

    const handleCellClick = () => {
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




    return (
        <div className="cell"
            style={{ backgroundColor }}
            onClick={handleCellClick}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            onMouseUp={handleMouseUp}>
            {cell.letter}
        </div>
    );
};

export default Cell;