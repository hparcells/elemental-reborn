import React, { forwardRef } from 'react';
import format from 'date-format';
import FlipMove from 'react-flip-move';

import { useMostRecentElements, usePlayerCount } from '../../logic/stats';

import Element from '../Element';
import ElementInfo from './ElementInfo';

function RightPanel({
  viewingElement,
  handleElementDropClick,
  closeElementInfo
}: {
  viewingElement: number;
  handleElementDropClick: () => void;
  closeElementInfo: () => void;
}) {
  const playerCount = usePlayerCount();
  const mostRecentElements = useMostRecentElements();

  return (
    <div id='right-panel-wrapper'>
      <div id='right-panel'>
        <div
          style={{
            textAlign: 'center'
          }}
        >
          <h1 style={{ marginBottom: '0px' }}>Elemental Reborn</h1>
          <p style={{ marginTop: '0px' }}>{playerCount} Online</p>
        </div>
        {viewingElement ? (
          <ElementInfo elementId={viewingElement} closeElementInfo={closeElementInfo} />
        ) : (
          <div>
            <div id='element-drop' onClick={handleElementDropClick}>
              <p>Drop Element Here to View Data</p>
            </div>

            <div>
              <h2>Most Recent Elements</h2>
              <FlipMove>
                {mostRecentElements.map((mostRecentElement) => {
                  return (
                    <div
                      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      key={mostRecentElement.id}
                    >
                      <Element element={mostRecentElement.parent1} noAnimate />
                      <span style={{ fontSize: '36px', margin: '0px 0.5em' }}>+</span>
                      <Element element={mostRecentElement.parent2} noAnimate />
                      <span style={{ fontSize: '36px', margin: '0px 0.5em' }}>=</span>
                      <Element element={mostRecentElement} noAnimate />

                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          marginLeft: '1em'
                        }}
                      >
                        <span>{format('yyyy-MM-dd', new Date(mostRecentElement.createdOn))}</span>
                        <span>{format('hh:mm:ss', new Date(mostRecentElement.createdOn))}</span>
                      </div>
                    </div>
                  );
                })}
              </FlipMove>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RightPanel;
