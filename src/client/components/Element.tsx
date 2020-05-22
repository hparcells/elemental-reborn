import React from 'react';
import { best } from 'wcag-color';

import { SimpleElement, ELEMENT_COLOR_MAP } from '../../shared/types';

function Element({ element }: { element: SimpleElement }) {
  return (
    <div
      style={{
        width: '75px',
        height: '75px',
        borderRadius: '5px',
        backgroundColor: ELEMENT_COLOR_MAP[element.color],
        margin: '1em',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <span
        style={{
          padding: '0.25em',
          fontSize: '12px',
          color: best('#ffffff', '#000000', ELEMENT_COLOR_MAP[element.color])
        }}
      >
        {element.name}
      </span>
    </div>
  );
}

export default Element;
