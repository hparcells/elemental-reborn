import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { SuggestingData } from '../../logic/types';
import Element from '../Element';

import { ELEMENT_COLOR_MAP, ElementColor } from '../../../shared/types';
import { Button } from '@material-ui/core';
import { suggestRecipe, getSuggestions, submitVote, submitDownvote } from '../../logic/elements';

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
  suggestion,
  openSnackbar
}: {
  suggestion: { uuid: string; childName: string; childColor: ElementColor };
  openSnackbar: (message: string) => void;
}) {
  async function handleUpvote() {
    const response = await submitVote(suggestion.uuid, userToken);

    if (response === 'VOTED') {
      openSnackbar('Voted!');
    }
  }
  async function handleDownvote() {
    const response = await submitDownvote(suggestion.uuid, userToken);

    if (response === 'VOTED') {
      openSnackbar('Downvoted!');
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div onClick={handleUpvote}>
        <Element
          element={{
            id: 0,
            name: suggestion.childName,
            color: suggestion.childColor
          }}
        />
      </div>
      <span
        style={{ fontSize: '12px', textAlign: 'center', cursor: 'default' }}
        onClick={handleDownvote}
      >
        Downvote
      </span>
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
    if (!text) {
      handleSuggestingDataChange({
        ...suggestingData,
        childName: 'Your Element'
      });
      setCanSubmit(
        text !== 'Your Element' && text !== '' && text.length !== 0 && text.length <= 50
      );
      return;
    }
    handleSuggestingDataChange({
      ...suggestingData,
      childName: text
    });

    setCanSubmit(text !== 'Your Element' && text !== '' && text.length !== 0 && text.length <= 50);
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
                  return (
                    <VotingElement
                      key={index}
                      suggestion={suggestion}
                      openSnackbar={openSnackbar}
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
