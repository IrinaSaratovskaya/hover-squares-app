import React, { useState, useEffect } from 'react';

import './App.css';

function App() {

    const generateGrid = (num) => {

        const gridArray = [];

        for (let i = 0; i < num; i++) {
            const row = [];
    
            for (let j = 0; j < num; j++) {
                row.push({ selected: false })    
            }
            gridArray.push(row);
        }
        return gridArray
    }
    
    const [grid, setGrid] = useState([]);
    const [mode, setMode] = useState('');
    const [options, setOptions] = useState(null);
    
    useEffect(() => {
        fetch('http://demo1030918.mockable.io/')
        .then(res => res.json())
        .then(
            (result) => {
                setOptions(result);
            }
        )
        }, [])

    const handleModeChange = (e) => {
        setMode(e.target.value);
        const newGridArray = generateGrid(e.target.value);
        setGrid(newGridArray);
    }


    const handleBgChange = (i, j) => {
        const updatedGrid = [...grid];
        updatedGrid[i][j].selected = !updatedGrid[i][j].selected;
        setGrid(updatedGrid);
    }

    const handleGridReset = () => {
        const resetGrid = generateGrid(mode);
        setGrid(resetGrid);
        
    }

    return options ? (
        <div className="container">
            <div className="row">
                <div className="col-8">
                    <form class="form-inline">
                        <select value={mode} onChange={handleModeChange} className="custom-select pb-1">
                            <option>Pick mode...</option>
                            <option value={options.easyMode.field}>{options.easyMode.field}</option> 
                            <option value={options.normalMode.field}>{options.normalMode.field}</option>
                            <option value={options.hardMode.field}>{options.hardMode.field}</option>
                        </select>
                        <button type="button" className="btn btn-sm btn-primary" onClick={handleGridReset} disabled={!mode}>Start</button>
                    </form>
                    <div className={`squares-grid squares-grid-${mode}`}>
                        {grid.map((squareRow, i) => (
                            squareRow.map((squareCol, j) => (
                                <div className={`square ${squareCol.selected ? 'blue' : ''}`} onMouseOver={() => handleBgChange(i, j)}>{squareCol.value}</div>
                            ))
                        ))}
                    </div>
                </div>
                <div className="col-4">
                    <h2 className="text-center hovered-title mb-3">Hovered Squares</h2>
                    <ul className="list-unstyled">
                        {grid.map((squareRow, i) => (
                            squareRow.map((squareCol, j) => (
                                squareCol.selected && (
                                    <li className="hovered-list-item">row {i+1} col {j+1}</li>
                                )
                            ))
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    ) : (
        <div>Loading...</div>
    )
}

export default App;
