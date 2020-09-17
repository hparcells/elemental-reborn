import React, { useEffect, useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import format from 'date-format';
import { capitalize } from '@reverse/string';

import { Element } from '../../shared/types';

function ElementInfo({
  elementId,
  closeElementInfo
}: {
  elementId: number;
  closeElementInfo: () => void;
}) {
  const [elementData, setElementData] = useState<Element>(null as any);

  useEffect(() => {
    (async () => {
      setElementData((await axios.get(`/api/get-full-element/${elementId}`)).data);
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
            <li>Suggested by {elementData.suggestedBy}</li>
            <li>
              Pioneered by {elementData.pioneer} at{' '}
              {format('yyyy-MM-dd, hh:mm:ss', new Date(elementData.createdOn))}
            </li>
          </ul>
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
