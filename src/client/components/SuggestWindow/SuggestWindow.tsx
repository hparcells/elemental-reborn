import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { SuggestingData } from '../../logic/types';
import Element from '../Element';

import { ELEMENT_COLOR_MAP, ElementColor } from '../../../shared/types';
import { Button } from '@material-ui/core';
import { suggestRecipe, getSuggestions, submitVote } from '../../logic/elements';

import classes from './SuggestWindow.module.scss';

import { userToken } from '../App';

function ColorSquare({
  color,
  handleColorClick
}: {
  color: ElementColor;
  handleColorClick: (color: ElementColor) => void;
}) {
  function handleClick() {
    handleColorClick(color);
  }

  return (
    <div
      style={{
        width: '32px',
        height: '20px',
        backgroundColor: ELEMENT_COLOR_MAP[color],
        flexBasis: '10%'
      }}
      onClick={handleClick}
    ></div>
  );
}
function VotingElement({
  suggestion
}: {
  suggestion: { uuid: string; childName: string; childColor: ElementColor };
}) {
  async function handleClick() {
    const repoonse = await submitVote(suggestion.uuid, userToken);
  }

  return (
    <div onClick={handleClick}>
      <Element
        element={{
          id: 0,
          name: suggestion.childName,
          color: suggestion.childColor
        }}
      />
    </div>
  );
}

function SuggestWindow({
  suggestingData,
  handleSuggestingDataChange,
  endSuggesting,
  openSnackbar
}: {
  suggestingData: SuggestingData;
  handleSuggestingDataChange: (suggestingData: SuggestingData) => void;
  endSuggesting: () => void;
  openSnackbar: (message: string) => void;
}) {
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
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

    setCanSubmit(suggestingData.childName !== 'Your Element');
  }
  function handleEditTextChange(text: string) {
    handleSuggestingDataChange({
      ...suggestingData,
      childName: text
    });

    setCanSubmit(text !== 'Your Element');
  }
  async function handleSuggest() {
    setCanSubmit(false);
    await suggestRecipe(suggestingData, userToken);
    endSuggesting();
    setCanSubmit(true);
    setOthersSuggestions(null as any);
    openSnackbar('Suggestion sent!');
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
          onClick={endSuggesting}
        >
          🠈
        </span>
        {suggestingData ? (
          <div>
            <p style={{ textAlign: 'center' }}>What should these create?</p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Element element={suggestingData.parent1} />
              <span style={{ fontSize: '36px', margin: '0px 0.5em' }}>+</span>
              <Element element={suggestingData.parent2} />
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
                handleEditTextChange={handleEditTextChange}
              />
            )}
            <Button
              variant='contained'
              color='primary'
              size='small'
              style={{ transform: 'scale(0.9)' }}
              disabled={!canSubmit}
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
                  return <VotingElement key={index} suggestion={suggestion} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuggestWindow;
