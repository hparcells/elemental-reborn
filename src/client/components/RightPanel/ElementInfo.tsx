import React, { useEffect, useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import format from 'date-format';
import { capitalize } from '@reverse/string';

import { getElementPath } from '../../logic/stats';

import { Element } from '../../../shared/types';

function ElementInfo({
  elementId,
  closeElementInfo
}: {
  elementId: number;
  closeElementInfo: () => void;
}) {
  const [elementData, setElementData] = useState<Element>(null as any);
  const [pathData, setPathData] = useState<any>(null as any);

  useEffect(() => {
    (async () => {
      setElementData((await axios.get(`/api/get-full-element/${elementId}`)).data);
      setPathData(await getElementPath(elementId));
    })();
  }, []);

  return (
    <div>
      <Button onClick={closeElementInfo} variant='contained' color='primary'>
        Back
      </Button>

      {elementData ? (
        <div>
          <h1>
            {elementData.name} (#{elementData.id}) - {capitalize(elementData.color)}
          </h1>
          <ul>
            {elementData.suggestedBy && <li>Suggested by {elementData.suggestedBy}</li>}
            <li>
              Pioneered by {elementData.pioneer} at{' '}
              {format('yyyy-MM-dd, hh:mm:ss', new Date(elementData.createdOn))}
            </li>
          </ul>

          <h2>Path</h2>
          <ol>
            {pathData ? (
              pathData.map((pathDataItem: string[][], index: number) => {
                return pathDataItem[0] === pathDataItem[1] ? (
                  <li key={index}>
                    <i>{pathDataItem[0]}</i> + <i>{pathDataItem[1]}</i> ={' '}
                    <strong>{pathDataItem[2]}</strong>
                  </li>
                ) : (
                  <li key={index}>
                    {pathDataItem[0]} + {pathDataItem[1]} = <strong>{pathDataItem[2]}</strong>
                  </li>
                );
              })
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress color='primary' />
              </div>
            )}
          </ol>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress color='primary' />
        </div>
      )}
    </div>
  );
}

export default ElementInfo;
