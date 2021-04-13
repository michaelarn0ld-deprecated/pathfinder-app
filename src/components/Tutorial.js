import React from 'react';
import { useState } from 'react';
import './Tutorial.scss';

export default function Tutorial() {
  const [arrow, setArrow] = useState(true);

  return (
    <div className={arrow ? 'tutorial-closed' : 'tutorial-open'}>
      <div className="tutorial-opener">
        <h1
          onClick={() => setArrow(!arrow)}
          className={arrow ? 'arrow-up' : 'arrow-down'}
        >
          {arrow ? (
            <div className="roto">
              <i class="fas fa-book"></i> Tutorial
            </div>
          ) : (
            <div className={arrow ? 'fade-out' : 'fade-in'}>
              <i class="far fa-times-circle"></i>
            </div>
          )}
        </h1>
        {arrow ? null : (
          <h1 className="tutorial-opener-words">
            <i class="fas fa-book"></i> Tutorial
          </h1>
        )}
      </div>
      {arrow ? null : (
        <div className="tutorial-content">
          <p>
            The purpose of this application is to find the shortest path between
            a starting and an ending point with at least one detour along the
            way. Optional walls can be placed along the grid that will be
            circumnavigated to reach the destination.
          </p>
          <br />
          <div>
            <p>
              Please use this application on a desktop or laptop in fullscreen
              for the best experience <i className="far fa-smile-beam"></i>
            </p>
            <br />
            <p>
              <i class="fas fa-chevron-right"></i> To place a start node: press
              the "s" key and click on a grid square
            </p>
            <p>
              <i class="fas fa-chevron-right"></i> To place an end node: press
              the "e" key and click on a grid square
            </p>
            <p>
              <i class="fas fa-chevron-right"></i> To place a detour node: press
              the "d" key and click on a grid square
            </p>
            <p>
              <i class="fas fa-chevron-right"></i> To place a wall node: hold
              the "w" key and hover over a grid square
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
