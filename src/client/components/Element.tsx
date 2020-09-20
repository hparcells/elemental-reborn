import React from 'react';
import { best } from 'wcag-color';
import EasyEdit from 'react-easy-edit';
import useFitText from 'use-fit-text';

import { SimpleElement, ELEMENT_COLOR_MAP } from '../../shared/types';

function Element({
  element,
  editable,
  noAnimate,
  handleEditTextChange,
  handleElementClick,
  style
}: {
  element: SimpleElement;
  editable?: boolean;
  noAnimate?: boolean;
  handleEditTextChange?: (text: string) => void;
  handleElementClick?: (id: number) => void;
  style?: React.CSSProperties;
}) {
  const { fontSize, ref } = useFitText();

  function handleClick() {
    if (handleElementClick) {
      handleElementClick(element.id);
    }
  }

  return (
    <div
      ref={ref}
      style={{
        fontSize: `min(${fontSize}, 12px)`,
        width: '75px',
        height: '75px',
        borderRadius: '5px',
        backgroundColor: ELEMENT_COLOR_MAP[element.color],
        margin: '0.25em',
        display: 'flex',
        justifyContent: 'center',
        userSelect: 'none',
        boxShadow: 'rgba(0, 0, 0, 0.75) 0px 2px 3px 0px',
        textAlign: 'center',
        wordBreak: 'break-word',
        ...style
      }}
      onClick={handleClick}
      className={noAnimate ? '' : 'animate-in'}
    >
      <span
        style={{
          padding: '0.25em',
          color: best('#ffffff', '#000000', ELEMENT_COLOR_MAP[element.color])
        }}
      >
        {editable ? (
          <EasyEdit type='text' onSave={handleEditTextChange} value={element.name} />
        ) : (
          element.name
        )}
      </span>
    </div>
  );
}

export default Element;
