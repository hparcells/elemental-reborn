import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';

import {
  getSuggestions,
  suggestRecipe,
  useCanSuggest,
  setCanSuggest
} from '../../logic/suggestions';

import Element from '../Element';
import ColorSquare from './ColorSquare';
import VotingElement from './VotingElement';

import { ELEMENT_COLOR_MAP, ElementColor, SuggestingData } from '../../../shared/types';

import classes from './SuggestWindow.module.scss';

import { userToken } from '../App';

function SuggestWindow({
  suggestingData,
  handleSuggestingDataChange,
  endSuggesting,
  openSnackbar
}: {
  suggestingData: SuggestingData;
  handleSuggestingDataChange: (suggestingData: SuggestingData) => void;
  endSuggesting: (id?: number) => void;
  openSnackbar: (message: string) => void;
}) {
  const canSuggest = useCanSuggest();

  const [othersSuggestions, setOthersSuggestions] = useState<
    { uuid: string; childName: string; childColor: ElementColor }[]
  >(null as any);

  useEffect(() => {
    (async () => {
      try {
        setOthersSuggestions(
          (await getSuggestions(suggestingData.parent1.id, suggestingData.parent2.id)).data
        );
      } catch (error) {
        // Do nothing.
      }
    })();
  }, [suggestingData?.parent1, suggestingData?.parent2]);

  function handleColorClick(color: ElementColor) {
    handleSuggestingDataChange({
      ...suggestingData,
      childColor: color
    });

    setCanSuggest(
      suggestingData.childName !== 'Your Element' &&
        !!/^([\x00-\x7F]){1,50}$/m.exec(suggestingData.childName.trim())
    );
  }
  function handleEditTextChange(text: string) {
    if (!text) {
      handleSuggestingDataChange({
        ...suggestingData,
        childName: 'Your Element'
      });
      setCanSuggest(text !== 'Your Element' && !!/^([\x00-\x7F]){1,50}$/m.exec(text.trim()));
      return;
    }
    handleSuggestingDataChange({
      ...suggestingData,
      childName: text
    });

    setCanSuggest(text !== 'Your Element' && !!/^([\x00-\x7F]){1,50}$/m.exec(text.trim()));
  }
  async function handleSuggest() {
    setCanSuggest(false);
    await suggestRecipe(suggestingData, userToken);
    endSuggesting();
    setOthersSuggestions(null as any);
    openSnackbar('Suggestion sent!');
  }
  function handlePioneer(id: number) {
    endSuggesting(id);
    setOthersSuggestions(null as any);
  }
  function handleCloseSuggestWindow() {
    endSuggesting();
  }

  return (
    <div className={classes.root}>
      <div className={classes.window}>
        <span
          style={{
            fontSize: '32px',
            textAlign: 'right',
            position: 'absolute',
            marginLeft: '0.25em',
            color: '#333333',
            cursor: 'default'
          }}
          onClick={handleCloseSuggestWindow}
        >
          🠈
        </span>
        {suggestingData ? (
          <div>
            <p style={{ textAlign: 'center' }}>What should these create?</p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Element element={suggestingData.parent1} noAnimate />
              <span style={{ fontSize: '36px', margin: '0px 0.5em' }}>+</span>
              <Element element={suggestingData.parent2} noAnimate />
            </div>
          </div>
        ) : null}

        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '1em 0em' }}>
          {Object.keys(ELEMENT_COLOR_MAP).map((color) => {
            return (
              <ColorSquare
                key={color}
                color={color as ElementColor}
                handleColorClick={handleColorClick}
              />
            );
          })}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {suggestingData && (
              <Element
                element={{
                  id: 0,
                  name: suggestingData.childName,
                  color: suggestingData.childColor
                }}
                style={{
                  transition: 'background-color 0.25s'
                }}
                editable
                noAnimate
                handleEditTextChange={handleEditTextChange}
              />
            )}
            <Button
              variant='contained'
              color='primary'
              size='small'
              style={{ transform: 'scale(0.9)' }}
              disabled={!canSuggest}
              onClick={handleSuggest}
            >
              Suggest
            </Button>
          </div>
          <div>
            <span style={{ marginLeft: '1em' }}>
              Others' Suggestions <span style={{ fontSize: '10px' }}>(Click to Vote)</span>
            </span>
            <div style={{ display: 'flex', flexDirection: 'row', transform: 'scale(0.9)' }}>
              {othersSuggestions &&
                othersSuggestions.map((suggestion, index) => {
                  return (
                    <VotingElement
                      key={index}
                      suggestion={suggestion}
                      openSnackbar={openSnackbar}
                      handlePioneer={handlePioneer}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuggestWindow;
