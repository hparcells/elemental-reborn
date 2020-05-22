import React, { useState, useEffect } from 'react';
import useMousePosition from '@react-hook/mouse-position';
import axios from 'axios';

import Element from './Element';

import { ElementColor, SimpleElement } from '../../shared/types';
import { getElementCount, getObtainedColors, getRecipe } from '../logic/elements';
import { getGameData } from '../logic/save';

function Game() {
  const [elements, setElements] = useState<SimpleElement[]>([]);
  const [elementCount, setElementCount] = useState<number>('Fetching...' as any);
  const [obtainedColors, setObtainedColors] = useState<ElementColor[]>([]);

  const [heldElement, setHeldElement] = useState<number | null>(null);

  const [mousePosition, ref] = useMousePosition(0, 0, 60);

  async function refreshData() {
    setElementCount(await getElementCount());

    setElements(await getGameData());
    setObtainedColors(await getObtainedColors());
  }
  useEffect(() => {
    (async () => {
      refreshData();
    })();
  }, []);

  async function handleElementClick(id: number) {
    if (!heldElement) {
      setHeldElement(id);
      return;
    }
    setHeldElement(null);

    const parent1 = Math.min(id, heldElement);
    const parent2 = Math.max(id, heldElement);

    if (
      (await getRecipe(parent1, parent2)) === 'element' ||
      (await getRecipe(parent1, parent2)) === 'suggest'
    ) {
      refreshData();
    }
  }

  return (
    <div ref={ref}>
      <p>
        {elements.length}/{elementCount} ({(elements.length / elementCount) * 100}%)
      </p>
      {elements.length > 0 && obtainedColors.length > 0
        ? obtainedColors.map((color) => {
            return (
              <div key={color} style={{ display: 'flex', margin: '1em 0px' }}>
                {elements
                  .filter((element: SimpleElement) => {
                    return element.color === color;
                  })
                  .map((element: SimpleElement) => {
                    return (
                      <Element
                        key={element.id}
                        element={element}
                        handleElementClick={handleElementClick}
                      />
                    );
                  })}
              </div>
            );
          })
        : 'Loading...'}
      {heldElement ? (
        <Element
          element={
            elements.find((element) => {
              return element.id === heldElement;
            }) as SimpleElement
          }
          handleElementClick={handleElementClick}
          style={{
            position: 'absolute',
            top: `${mousePosition.y && mousePosition.y + 20}px`,
            left: `${mousePosition.x && mousePosition.x + 20}px`
          }}
        />
      ) : null}
    </div>
  );
}

export default Game;
