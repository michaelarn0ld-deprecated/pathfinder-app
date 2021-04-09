import React from 'react';
import Node from './components/Node';
import Tutorial from './components/Tutorial';
import { useEffect } from 'react';
import './App.scss';

export default function App() {
  const nodes = [];
  for (let row = 0; row < 23; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(true);
    }
    nodes.push(currentRow);
  }

  let documentNodes;
  let wallToggle,
    nodeToggle,
    startToggle,
    endToggle = false;

  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'w':
        wallToggle = true;
        break;
      case 'd':
        nodeToggle = true;
        break;
      case 's':
        startToggle = true;
        break;
      case 'e':
        endToggle = true;
        break;
      default:
        break;
    }
  });

  document.addEventListener('keyup', () => {
    wallToggle = false;
    nodeToggle = false;
    startToggle = false;
    endToggle = false;
  });

  useEffect(() => {
    documentNodes = document.querySelectorAll('.node');
    documentNodes.forEach((node) => {
      node.addEventListener('mouseover', () => {
        if (wallToggle) node.classList.add('wall');
      });
      node.addEventListener('click', () => {
        if (nodeToggle) {
          node.classList.remove('address');
          node.classList.add('address');
          if (!parcels.includes(node) && node.classList.value.includes('node'))
            parcels.push(node);
        }
        if (startToggle) {
          documentNodes.forEach((node) => {
            if (node.classList.contains('start-node'))
              node.classList.remove('start-node');
          });
          node.classList.add('start-node');
          startNode = node;
        }

        if (endToggle) {
          documentNodes.forEach((node) => {
            if (node.classList.contains('end-node'))
              node.classList.remove('end-node');
          });
          node.classList.add('end-node');
          endNode = node;
        }
      });
    });
  });

  let startNode;
  let endNode;
  let endSearch;
  let searchTime = 0;
  let routeTime = 0;
  let parcels = [];
  const directions = [];
  let trigger = false;
  let permGraph = Object.create(null);
  let permArray = [];

  const pathButton = () => {
    if (startNode === undefined || endNode === undefined)
      alert('Select a start node and an end node');
    else {
      const nodesArray = [...documentNodes].map((node) => node.classList);
      const stringifyNodesArray = [...documentNodes].map((item) => {
        if (!item.classList.value.includes('wall')) {
          let splitter = item.classList.value.split(' ');
          return `${splitter[0]} ${splitter[1]} ${splitter[2]}`;
        }
        return item.classList.value;
      });
      let startGraph = startNode.classList.value.split(' ');
      startGraph = `.${startGraph[0]}.${startGraph[1]}.${startGraph[2]}`;
      let endGraph = endNode.classList.value.split(' ');
      endGraph = `.${endGraph[0]}.${endGraph[1]}.${endGraph[2]}`;

      const graph = nodesArray.map((node) => {
        const row = Number(node[1].substring(1));
        const col = Number(node[2].substring(1));

        const thisNode = `.node.R${row}.C${col}`;

        const upNode = stringifyNodesArray.includes(`node R${row - 1} C${col}`)
          ? `.node.R${row - 1}.C${col}`
          : null;
        const downNode = stringifyNodesArray.includes(
          `node R${row + 1} C${col}`
        )
          ? `.node.R${row + 1}.C${col}`
          : null;
        const leftNode = stringifyNodesArray.includes(
          `node R${row} C${col - 1}`
        )
          ? `.node.R${row}.C${col - 1}`
          : null;
        const rightNode = stringifyNodesArray.includes(
          `node R${row} C${col + 1}`
        )
          ? `.node.R${row}.C${col + 1}`
          : null;

        let nodeGraph = Object.create(null);
        nodeGraph[thisNode] = [upNode, downNode, leftNode, rightNode].filter(
          (item) => item != null
        );

        return nodeGraph;
      });

      let newGraph = Object.create(null);
      for (let i = 0; i < graph.length; i++) {
        newGraph[Object.keys(graph[i])[0]] = graph[i][Object.keys(graph[i])[0]];
      }

      for (let parcel of parcels) {
        let item = parcel.classList.value.split(' ');
        directions.push(`.${item[0]}.${item[1]}.${item[2]}`);
      }

      // ----------------------------------------------------------

      // function findRoute(graph, from, to) {
      //   documentNodes.forEach((node) => {
      //     if (node.classList.contains('travel')) {
      //       node.classList.remove('travel');
      //       node.classList.add('nomo');
      //     }
      //   });
      //   if (to.length === 0 && !trigger) {
      //     endSearch = from;
      //     triggerEndNode();
      //     return;
      //   } else if (to.length === 0 && trigger) {
      //     return;
      //   }
      //   let work = [{ at: from, route: [] }];
      //   for (let i = 0; i < work.length; i++) {
      //     searchTime = 4 * i;
      //     setTimeout(() => {
      //       document.querySelector(`${work[i].at}`).classList.add('travel');
      //     }, searchTime);
      //     let { at, route } = work[i];
      //     for (let place of graph[at]) {
      //       if (to.includes(place)) {
      //         let index = to.indexOf(place);
      //         let pop = to.splice(index, 1);
      //         for (let j = 0; j < route.length; j++) {
      //           routeTime = searchTime;
      //           setTimeout(() => {
      //             document.querySelector(`${route[j]}`).classList.add('route');
      //           }, 60 * j + searchTime);
      //           routeTime += 60 * j;
      //         }
      //         return setTimeout(() => {
      //           findRoute(graph, pop, to);
      //         }, routeTime);
      //       }
      //       if (!work.some((w) => w.at == place)) {
      //         work.push({ at: place, route: route.concat(place) });
      //       }
      //     }
      //   }
      // }

      // ----------------------------------------------------------

      function findRoute(graph, from, to, array) {
        documentNodes.forEach((node) => {
          if (node.classList.contains('travel')) {
            node.classList.remove('travel');
            node.classList.add('nomo');
          }
        });
        if (to.length === 0) {
          array.splice(array.indexOf(from), 1, 0);
          // console.log(array);
          // console.log('------------------');
          permArray.push(array);
        }
        let work = [{ at: from, route: [] }];
        for (let i = 0; i < work.length; i++) {
          searchTime = 4 * i;
          // setTimeout(() => {
          //   document.querySelector(`${work[i].at}`).classList.add('travel');
          // }, searchTime);
          let { at, route } = work[i];
          for (let place of graph[at]) {
            if (to.includes(place)) {
              array.splice(array.indexOf(place), 1, [
                route,
                route.length,
                place,
              ]);
              console.log(from, place, route.length);
              let index = to.indexOf(place);
              to.splice(index, 1);
              // for (let j = 0; j < route.length; j++) {
              //   routeTime = searchTime;
              //   setTimeout(() => {
              //     document.querySelector(`${route[j]}`).classList.add('route');
              //   }, 60 * j + searchTime);
              //   routeTime += 60 * j;
              // }
              // return setTimeout(() => {
              //   findRoute(graph, from, to);
              // }, routeTime);
              findRoute(graph, from, to, array);
            }
            if (!work.some((w) => w.at == place)) {
              work.push({ at: place, route: route.concat(place) });
            }
          }
        }
      }

      let perm = directions.map((item) => item);
      perm = [startGraph, ...perm];
      for (let i = 0; i < perm.length; i++) {
        permGraph[perm[i]] = perm;
        let parentNode = perm[i];
        let destinationNode = perm
          .map((item) => item != parentNode && item)
          .filter((node) => node != false);
        let permArray = perm.map((item) => item);

        findRoute(newGraph, parentNode, destinationNode, permArray);
      }

      console.log(permGraph);
      console.log(permArray[0][2][0]);

      // const triggerEndNode = () => {
      //   trigger = true;
      //   findRoute(newGraph, endSearch[0], [endGraph]);
      // };

      // if (parcels.length > 0) findRoute(newGraph, startGraph, directions);
      // else {
      //   trigger = true;
      //   findRoute(newGraph, startGraph, [endGraph]);
      // }
    }
  };

  const clearBoard = () => {
    documentNodes.forEach((node) => {
      if (node.classList.length >= 3)
        node.classList.remove(
          'travel',
          'nomo',
          'start-node',
          'end-node',
          'wall',
          'address',
          'route'
        );
    });
    parcels = [];
    trigger = false;
    startNode = undefined;
    endNode = undefined;
  };

  return (
    <div className="main">
      <div className="navbar">
        <h2 onClick={() => pathButton()}>Find Path</h2>
        <h2 onClick={() => clearBoard()}>Clear Board</h2>
        <div className="start-legend">
          <div className="start-legend-graphic"></div>
          <h3>Start</h3>
        </div>
        <div className="end-legend">
          <div className="end-legend-graphic"></div>
          <h3>End</h3>
        </div>
        <div className="wall-legend">
          <div className="wall-legend-graphic"></div>
          <h3>Wall</h3>
        </div>
        <div className="detour-legend">
          <div className="detour-legend-graphic"></div>
          <h3>Detour</h3>
        </div>
        <div className="path-legend">
          <div className="path-legend-graphic"></div>
          <h3>Path</h3>
        </div>
      </div>
      <div className="nodes">
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
      <Tutorial />
    </div>
  );
}
