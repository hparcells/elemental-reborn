import React, { useState, useEffect } from 'react';
import useMousePosition from '@react-hook/mouse-position';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import Element from './Element';
import SuggestWindow from './SuggestWindow/SuggestWindow';

import { ElementColor, SimpleElement } from '../../shared/types';
import { SuggestingData } from '../logic/types';

import { getElementCount, getObtainedColors, getRecipe } from '../logic/elements';
import { getGameData } from '../logic/save';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function Game() {
  const [elements, setElements] = useState<SimpleElement[]>([]);
  const [elementCount, setElementCount] = useState<number>('Fetching...' as any);
  const [obtainedColors, setObtainedColors] = useState<ElementColor[]>([]);
  const [suggesting, setSuggesting] = useState<boolean>(false);
  const [suggestingData, setSuggestingData] = useState<SuggestingData>(null as any);

  const [heldElement, setHeldElement] = useState<number | null>(null);

  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const [mousePosition, ref] = useMousePosition(0, 0, 30);

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

    const recipeResult = await getRecipe(parent1, parent2);
    if (recipeResult === 'element' || recipeResult === 'suggest') {
      refreshData();

      if (recipeResult === 'suggest') {
        setSuggesting(true);
        setSuggestingData({
          parent1: elements.filter((element) => {
            return element.id === parent1;
          })[0],
          parent2: elements.filter((element) => {
            return element.id === parent2;
          })[0],
          childName: 'Your Element',
          childColor: 'white'
        });
      }
    }
  }
  function handleSuggestingDataChange(suggestingData: SuggestingData) {
    setSuggestingData(suggestingData);
  }
  function endSuggesting() {
    setSuggesting(false);
    setSuggestingData(null as any);
  }

  function openSnackbar(message: string) {
    setSnackbarMessage(message);
    setShowSnackbar(true);
  }
  function closeSnackbar() {
    setShowSnackbar(false);
  }

  return (
    <div ref={ref} style={{ width: '100vw', height: '100vh' }}>
      <div style={{ padding: '0.5em' }}>
        <p>
          {elements.length}/{elementCount} (
          {Number(((elements.length / elementCount) * 100).toFixed(2))}%)
        </p>
        {elements.length > 0 && obtainedColors.length > 0
          ? obtainedColors.map((color) => {
              return (
                <div
                  key={color}
                  id={color}
                  style={{ display: 'flex', margin: '1em 0px', flexWrap: 'wrap' }}
                >
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
      </div>
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
      {suggesting ? (
        <SuggestWindow
          suggestingData={suggestingData}
          handleSuggestingDataChange={handleSuggestingDataChange}
          endSuggesting={endSuggesting}
          openSnackbar={openSnackbar}
        />
      ) : null}

      <Snackbar open={showSnackbar} autoHideDuration={5000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity='success'>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Game;
