import React from 'react';
import Element from '../Element';

import { ElementColor } from '../../../shared/types';

import { submitDownvote, submitVote } from '../../logic/suggestions';

function VotingElement({
  suggestion,
  openSnackbar,
  handlePioneer
}: {
  suggestion: { uuid: string; childName: string; childColor: ElementColor };
  openSnackbar: (message: string) => void;
  handlePioneer: (id: number) => void;
}) {
  async function handleUpvote() {
    const response = String(await submitVote(suggestion.uuid));

    if (response.startsWith('PIONEER')) {
      const id = response.substring(8);

      openSnackbar(`Created: ${suggestion.childName}`);
      handlePioneer(Number(id));
    }
    if (response === 'VOTED') {
      openSnackbar('Voted!');
    }
    if (response === 'ALREADY-VOTED') {
      openSnackbar('Already voted!');
    }
  }
  async function handleDownvote() {
    const response = await submitDownvote(suggestion.uuid);

    if (response === 'VOTED') {
      openSnackbar('Downvoted!');
    }
    if (response === 'ALREADY-VOTED') {
      openSnackbar('Already downvoted!');
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
          noAnimate
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

export default VotingElement;
