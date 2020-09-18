import React from 'react';

import { ElementColor, ELEMENT_COLOR_MAP } from '../../../shared/types';

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

export default ColorSquare;
