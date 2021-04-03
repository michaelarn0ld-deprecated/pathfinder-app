import React from 'react';
import Node from './Node';
import { useEffect } from 'react';
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

  let startNode;
  let endNode;
  let documentNodes;
  useEffect(() => {
    documentNodes = document.querySelectorAll('.node');
  });

  const startButton = () => {
    documentNodes.forEach((node) => {
      if (node.classList.contains('start-node'))
        node.classList.remove('start-node');
    });
    document.addEventListener('mouseup', function startNodeHandler(e) {
      e.currentTarget.removeEventListener(e.type, startNodeHandler);
      startNode = document.elementFromPoint(e.pageX, e.pageY);
      startNode.classList.add('start-node');
    });
    // --------------------------------------------------------------
    // const documentNodes = document.querySelectorAll('.node');
    // documentNodes.forEach((node) => {
    //   if (node.classList.contains('active')) node.classList.remove('active');
    //   node.addEventListener('mouseup', () => {
    //     node.classList.add('active');
    //     console.log('listening...');
    //   });
    // });
    // --------------------------------------------------------------
  };

  const endButton = () => {
    documentNodes.forEach((node) => {
      if (node.classList.contains('end-node'))
        node.classList.remove('end-node');
    });
    document.addEventListener('mouseup', function endNodeHandler(e) {
      e.currentTarget.removeEventListener(e.type, endNodeHandler);
      endNode = document.elementFromPoint(e.pageX, e.pageY);
      endNode.classList.add('end-node');
    });
    // --------------------------------------------------------------
    // const documentNodes = document.querySelectorAll('.node');
    // documentNodes.forEach((node) => {
    //   if (node.classList.contains('active')) node.classList.remove('active');
    //   node.addEventListener('mouseup', () => {
    //     node.classList.add('active');
    //     console.log('listening...');
    //   });
    // });
    // --------------------------------------------------------------
  };

  const pathButton = () => {
    const nodesArray = [...documentNodes].map((node) => node.classList);
    const stringifyNodesArray = [...documentNodes].map(
      (item) => item.classList.value
    );

    const graph = nodesArray.map((node) => {
      const row = Number(node[1].substring(1));
      const col = Number(node[2].substring(1));

      const thisNode = `.node.R${row}.C${col}`;

      const upNode = stringifyNodesArray.includes(`node R${row - 1} C${col}`)
        ? `node.R${row - 1}.C${col}`
        : null;
      const downNode = stringifyNodesArray.includes(`node R${row + 1} C${col}`)
        ? `node.R${row + 1}.C${col}`
        : null;
      const leftNode = stringifyNodesArray.includes(`node R${row} C${col - 1}`)
        ? `node.R${row}.C${col - 1}`
        : null;
      const rightNode = stringifyNodesArray.includes(`node R${row} C${col + 1}`)
        ? `node.R${row}.C${col + 1}`
        : null;

      let nodeGraph = Object.create(null);
      nodeGraph[thisNode] = [upNode, downNode, leftNode, rightNode].filter(
        (item) => item != null
      );

      return nodeGraph;
    });
    console.log(graph);

    // const startCol = Number(startNode.classList[2].substring(1));
    // const endCol = Number(endNode.classList[2].substring(1));
    // const startRow = Number(startNode.classList[1].substring(1));
    // const endRow = Number(endNode.classList[1].substring(1));

    // for (let i = startCol + 1; i <= endCol; i++) {
    //   setTimeout(() => {
    //     document
    //       .querySelector(`.node.R${startRow}.C${i}`)
    //       .classList.add('travel');
    //   }, 20 * i);
    // }

    // for (let i = startRow + 1; i <= endRow; i++) {
    //   setTimeout(() => {
    //     setTimeout(() => {
    //       document
    //         .querySelector(`.node.R${i}.C${endCol}`)
    //         .classList.add('travel');
    //     }, 20 * i);
    //   }, (endCol - startCol + 2) * 20);
    // }
  };

  return (
    <div className="main">
      <div className="buttons">
        <h2 onMouseDown={() => startButton()}>Start</h2>
        <h2 onMouseDown={() => endButton()}>End</h2>
        <h2 onClick={() => pathButton()}>Add Color</h2>
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
