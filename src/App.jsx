import React, { useState } from "react";

function App() {
  const [tableData, setTableData] = useState([]);

  const [numRows, setNumRows] = useState(0);
  const [numCols, setNumCols] = useState(0);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);

  const [showTable, setShowTable] = useState(false);
  const [resultsChecked, setResultsChecked] = useState(false);

  const handleLoadTable = () => {
    if (numRows == 0 || numCols == 0) {
      alert("Enter input");
      return;
    }
    if (min == 0 || max == 0) {
      alert("Enter range");
      return;
    }
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j < numCols; j++) {
        row.push(Math.floor(Math.random() * (max - min) + min)); // Random numbers
      }

      row.push("");
      rows.push(row);
    }
    setTableData(rows);
    setShowTable(true);
  };

  const handleInputChange = (e, rowIndex, colIndex) => {
    const newTableData = [...tableData];
    newTableData[rowIndex][colIndex] = e.target.value;
    setTableData(newTableData);
  };

  const handleCheckResults = () => {
    const updatedTable = [...tableData];
    updatedTable.forEach((row, rowIndex) => {
      const sum = row.slice(0, numCols).reduce((a, b) => a + Number(b), 0);
      row[numCols + 1] = sum;
    });
    setTableData(updatedTable);
    setResultsChecked(true);
  };

  const handleReloadTable = () => {
    setShowTable(false);
    setResultsChecked(false);
    setTableData([]);
  };

  return (
    <div >
      <div className="p-5 bg-success mb-1 rounded text-center text-white mt-5">
        <h2>Calculation Sharpner</h2>
      </div>

      <div className="text-center p-5 rounded bg-info">
        {!showTable && (
          <div>
            <h6>Enter number of problems:</h6>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                value={numRows}
                onChange={(e) => setNumRows(e.target.value)}
              />
            </div>
            <h6>Enter number of numbers:</h6>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                value={numCols}
                onChange={(e) => setNumCols(e.target.value)}
              />
            </div>
            <div className="d-flex flex-row  justify-content-between mb-2">
              <select
                className="form-select form-select-sm w-50 mx-2"
                onChange={(e) => setMin(Number(e.target.value))}
              >
                <option selected value={min}>
                  {min === 0 ? 'Lower range' : min}
                </option>
                <option value="1">1</option>
                <option value="10">10</option>
                <option value="100">100</option>
              </select>

              <select
                className="form-select form-select-sm w-50 mx-2"
                onChange={(e) => setMax(Number(e.target.value))}
              >
                <option selected value={max}>
                  {max === 0 ? 'Upper range' : max}
                </option>

                <option value="10">10</option>
                <option value="100">100</option>
                <option value="1000">1000</option>
              </select>
            </div>
            <button className="btn btn-primary btn-sm mt-3" onClick={handleLoadTable}>
              Load Table
            </button>
          </div>
        )}

        {showTable && (
          <div>
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  {[...Array(Number(numCols)).keys()].map((col) => (
                    <th key={col}>{`Num ${col + 1}`}</th>
                  ))}
                  <th className="w-50">Your Sum</th>
                  {resultsChecked && <th>Correct Sum</th>}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={
                      resultsChecked
                        ? row[numCols] == row[numCols + 1]
                          ? "table-success"
                          : "table-danger"
                        : ""
                    }
                  >
                    {row.slice(0, numCols).map((col, colIndex) => (
                      <td key={colIndex}>{col}</td>
                    ))}
                    <td>
                      <input
                        type="number"
                        className="form-control text-center"
                        value={row[numCols] || ""}
                        onChange={(e) =>
                          handleInputChange(e, rowIndex, numCols)
                        }
                        disabled={resultsChecked}
                      />
                    </td>
                    {resultsChecked && <td>{row[numCols + 1]}</td>}
                  </tr>
                ))}
              </tbody>
            </table>

            {!resultsChecked && (
              <button className="btn btn-success" onClick={handleCheckResults}>
                Check Results
              </button>
            )}
            {resultsChecked && (
              <button
                className="btn btn-warning mt-3"
                onClick={handleReloadTable}
              >
                Reload Table
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
