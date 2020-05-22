import React, { useState } from 'react';

import { SuggestingData } from '../logic/types';
import Element from './Element';

import { ELEMENT_COLOR_MAP, ElementColor } from '../../shared/types';
import { Button } from '@material-ui/core';
import { suggestRecipe } from '../logic/elements';

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

function SuggestWindow({
  suggestingData,
  handleSuggestingDataChange,
  endSuggesting
}: {
  suggestingData: SuggestingData;
  handleSuggestingDataChange: (suggestingData: SuggestingData) => void;
  endSuggesting: () => void;
}) {
  const [canSubmit, setCanSubmit] = useState<boolean>(false);

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
    await suggestRecipe(suggestingData);
    endSuggesting();
    setCanSubmit(true);
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div style={{ backgroundColor: '#ffffff', height: '320px', width: '320px' }}>
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
          <div>
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
            <span style={{ marginLeft: '1em' }}>Others' Suggestions</span>
            <div style={{ display: 'flex', flexDirection: 'row', transform: 'scale(0.9)' }}>
              {suggestingData && (
                <Element
                  element={{
                    id: 0,
                    name: suggestingData.childName,
                    color: suggestingData.childColor
                  }}
                />
              )}
              {suggestingData && (
                <Element
                  element={{
                    id: 0,
                    name: suggestingData.childName,
                    color: suggestingData.childColor
                  }}
                />
              )}
              {suggestingData && (
                <Element
                  element={{
                    id: 0,
                    name: suggestingData.childName,
                    color: suggestingData.childColor
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuggestWindow;
