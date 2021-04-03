import React from 'react';
import './Node.scss';

function Node({ row, col }) {
  return <div className={`node R${row} C${col}`}></div>;
}

export default Node;
