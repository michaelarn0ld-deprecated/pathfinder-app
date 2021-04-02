import React from 'react';
import Node from './Node';
import './App.scss';

function App() {
  const nodes = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(true);
    }
    nodes.push(currentRow);
  }

  return (
    <div className="main">
      <div className="buttons">
        <h2>Start</h2>
        <h2>End</h2>
      </div>
      {nodes.map((row, index) => {
        let rowIdx = index;
        return (
          <div className="row" key={index}>
            {row.map((col, index) => {
              return <Node key={(rowIdx, index)} row={rowIdx} col={index} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
