import React from 'react';
import { best } from 'wcag-color';
import EditableLabel from 'react-inline-editing';

import { SimpleElement, ELEMENT_COLOR_MAP } from '../../shared/types';

function Element({
  element,
  editable,
  handleEditTextChange,
  handleElementClick,
  style
}: {
  element: SimpleElement;
  editable?: boolean;
  handleEditTextChange?: (text: string) => void;
  handleElementClick?: (id: number) => void;
  style?: any;
}) {
  function handleClick() {
    if (handleElementClick) {
      handleElementClick(element.id);
    }
  }

  return (
    <div
      style={{
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
        ...style
      }}
      onClick={handleClick}
    >
      <span
        style={{
          padding: '0.25em',
          fontSize: '12px',
          color: best('#ffffff', '#000000', ELEMENT_COLOR_MAP[element.color])
        }}
      >
        {editable ? (
          <EditableLabel text={element.name} onFocusOut={handleEditTextChange} />
        ) : (
          element.name
        )}
      </span>
    </div>
  );
}

export default Element;
