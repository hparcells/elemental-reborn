import React, { useState, useEffect } from 'react';
import useMousePosition from '@react-hook/mouse-position';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { capitalize } from '@reverse/string';

import Element from './Element';
import SuggestWindow from './SuggestWindow/SuggestWindow';

import { ElementColor, ElementCount, SimpleElement } from '../../shared/types';
import { SuggestingData } from '../logic/types';

import {
  getElementCount,
  getObtainedColors,
  getRecipe,
  manualEarnElement
} from '../logic/elements';
import { getGameData } from '../logic/save';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function Game() {
  const [elements, setElements] = useState<SimpleElement[]>([]);
  const [elementCount, setElementCount] = useState<ElementCount>('Fetching...' as any);
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

  async function tryElement(beforeParent1: number, beforeParent2: number) {
    const parent1 = Math.min(beforeParent1, beforeParent2);
    const parent2 = Math.max(beforeParent1, beforeParent2);

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
  async function handleElementClick(id: number) {
    if (!heldElement) {
      setHeldElement(id);
      return;
    }
    setHeldElement(null);

    tryElement(id, heldElement);
  }
  function handleSuggestingDataChange(suggestingData: SuggestingData) {
    setSuggestingData(suggestingData);
  }
  async function endSuggesting(id?: number) {
    setSuggesting(false);
    setSuggestingData(null as any);

    if (id) {
      manualEarnElement(id);
      refreshData();
    }
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
          {elements.length}/{elementCount.total} (
          {Number(((elements.length / elementCount.total) * 100).toFixed(2))}%)
        </p>
        {elements.length > 0 && obtainedColors.length > 0
          ? obtainedColors.map((color) => {
              return (
                <div key={color}>
                  <div
                    style={{
                      display: 'flex'
                    }}
                  >
                    <p
                      style={{
                        flexGrow: 1
                      }}
                    >
                      {capitalize(color)} (
                      {
                        elements.filter((element: SimpleElement) => {
                          return element.color === color;
                        }).length
                      }
                      /{elementCount[color]})
                    </p>
                    <p
                      style={{
                        marginRight: '1em'
                      }}
                    >
                      {(
                        (elements.filter((element: SimpleElement) => {
                          return element.color === color;
                        }).length /
                          elementCount[color]) *
                        100
                      ).toFixed(2)}
                      %
                    </p>
                  </div>
                  <div
                    id={color}
                    style={{
                      display: 'flex',
                      margin: '1em 0px',
                      flexWrap: 'wrap',
                      marginTop: '0px'
                    }}
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
            top: `${mousePosition.y && mousePosition.y}px`,
            left: `${mousePosition.x && mousePosition.x}px`
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
