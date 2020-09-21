import React, { useState, useEffect } from 'react';
import useMousePosition from '@react-hook/mouse-position';
import { capitalize } from '@reverse/string';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { getObtainedColors, manualEarnElement } from '../logic/elements';
import { useElementCount } from '../logic/stats';
import { getGameData } from '../logic/save';
import { getRecipe } from '../logic/recipes';
import {
  setIsSuggesting,
  setSuggestingData,
  useIsSuggesting,
  useSuggestingData
} from '../logic/suggestions';

import Element from './Element';
import SuggestWindow from './SuggestWindow/SuggestWindow';
import RightPanel from './RightPanel/RightPanel';

import { ElementColor, SimpleElement, SuggestingData } from '../../shared/types';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function Game() {
  const [elements, setElements] = useState<SimpleElement[]>([]);
  const [obtainedColors, setObtainedColors] = useState<ElementColor[]>([]);
  const [heldElement, setHeldElement] = useState<number>(null as any);

  const [mousePosition, ref] = useMousePosition(0, 0, 30);

  const elementCount = useElementCount();

  async function refreshData() {
    setElements(await getGameData());
    setObtainedColors(await getObtainedColors());
  }

  useEffect(() => {
    (async () => {
      refreshData();
    })();
  }, []);

  // Snackbar
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  function openSnackbar(message: string) {
    setSnackbarMessage(message);
    setShowSnackbar(true);
  }
  function closeSnackbar() {
    setShowSnackbar(false);
  }

  // Suggest Window
  const isSuggesting = useIsSuggesting();
  const suggestingData = useSuggestingData();

  function handleSuggestingDataChange(suggestingData: SuggestingData) {
    setSuggestingData(suggestingData);
  }
  async function endSuggesting(id?: number) {
    setIsSuggesting(false);
    setSuggestingData(null as any);

    if (id) {
      await manualEarnElement(id);
      refreshData();
    }
  }

  // Elements
  async function tryElement(beforeParent1: number, beforeParent2: number) {
    closeSnackbar();

    const parent1 = Math.min(beforeParent1, beforeParent2);
    const parent2 = Math.max(beforeParent1, beforeParent2);

    const recipeResult = await getRecipe(parent1, parent2);
    if (recipeResult.type === 'element' || recipeResult.type === 'suggest') {
      refreshData();

      if (recipeResult.type === 'suggest') {
        setIsSuggesting(true);
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
        return;
      }

      if (recipeResult.element) {
        openSnackbar(`Discovered: ${recipeResult.element.name}`);
      }
    }

    if (recipeResult.type === 'element-no-refresh' && recipeResult.element) {
      openSnackbar(`Rediscovered: ${recipeResult.element.name}`);
    }
  }
  async function handleElementClick(id: number) {
    if (!heldElement) {
      setHeldElement(id);
      return;
    }
    setHeldElement(null as any);

    tryElement(id, heldElement);
  }

  // Right Panel
  const [viewingElement, setViewingElement] = useState<number>(null as any);

  function handleElementDropClick() {
    setViewingElement(heldElement);
    setHeldElement(null as any);
  }
  function closeElementInfo() {
    setViewingElement(null as any);
  }

  return (
    <div ref={ref}>
      <div id='game-wrapper'>
        <div id='element-wrapper' style={{ padding: '0.5em' }}>
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

        <RightPanel
          viewingElement={viewingElement}
          handleElementDropClick={handleElementDropClick}
          closeElementInfo={closeElementInfo}
        />

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

        <Snackbar
          open={showSnackbar}
          autoHideDuration={5000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={closeSnackbar} severity='success'>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>

      {isSuggesting ? (
        <SuggestWindow
          suggestingData={suggestingData}
          handleSuggestingDataChange={handleSuggestingDataChange}
          endSuggesting={endSuggesting}
          openSnackbar={openSnackbar}
        />
      ) : null}
    </div>
  );
}

export default Game;
