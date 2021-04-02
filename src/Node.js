import React from 'react';
import './Node.scss';
import { useState } from 'react';

function Node({ row, col }) {
  const [active, setActive] = useState(false);
  return (
    <div
      className={`node ${active ? 'active' : ''}`}
      onClick={() => setActive(!active)}
    ></div>
  );
}

export default Node;
