import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { unique } from '@reverse/array';

import Element from './Element';

import { ElementColor, SimpleElement } from '../../shared/types';
import { getElementCount, getObtainedColors } from '../logic/elements';
import { getGameData } from '../logic/save';

function Game() {
  const [elements, setElements] = useState<SimpleElement[]>([]);
  const [elementCount, setElementCount] = useState<string>('Fetching...');
  const [obtainedColors, setObtainedColors] = useState<ElementColor[]>([]);

  useEffect(() => {
    (async () => {
      setElementCount(await getElementCount());

      setElements(await getGameData());
      setObtainedColors(await getObtainedColors());
    })();
  }, []);

  return (
    <div>
      <p>{elementCount} Elements to Find.</p>
      {elements.length > 0 && obtainedColors.length > 0
        ? obtainedColors.map((color) => {
            return (
              <div key={color}>
                {elements
                  .filter((element: SimpleElement) => {
                    return element.color === color;
                  })
                  .map((element: SimpleElement) => {
                    return <Element key={element.id} element={element} />;
                  })}
              </div>
            );
          })
        : 'Loading...'}
    </div>
  );
}

export default Game;
