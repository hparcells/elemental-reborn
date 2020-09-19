import { io } from 'fullstack-system';

import { database } from '.';

import { Suggestion } from '../../shared/types';

import { elementExistsName, getElementName } from './elements';
import { recipeExists } from './recipes';
import { getElementCount, getMostRecentElements } from './stats';

async function suggestionExists(uuid: string) {
  return (await database.collection('suggestions').find({ uuid }).count()) === 1;
}
export async function addSuggestion(suggestion: Suggestion) {
  if (
    !(await suggestionExists(suggestion.uuid)) &&
    !(await recipeExists(suggestion.parent1, suggestion.parent2))
  ) {
    await database.collection('suggestions').insertOne(suggestion);
  }
}
export async function getTopSuggestions(parent1: number, parent2: number) {
  return await database
    .collection('suggestions')
    .aggregate([
      {
        $match: {
          parent1,
          parent2
        }
      },
      {
        $addFields: {
          upvoteCount: {
            $size: '$upvotes'
          },
          downvoteCount: {
            $size: '$downvotes'
          }
        }
      },
      {
        $addFields: {
          totalVotes: {
            $subtract: ['$upvoteCount', '$downvoteCount']
          }
        }
      },
      {
        $sort: {
          totalVotes: -1
        }
      },
      {
        $limit: 3
      }
    ])
    .project({ _id: false, uuid: true, childName: true, childColor: true })
    .toArray();
}
async function getSuggestion(uuid: string): Promise<Suggestion> {
  return (await database.collection('suggestions').find({ uuid }).toArray())[0];
}

async function getUpvotes(uuid: string) {
  return (
    await database
      .collection('suggestions')
      .aggregate([
        {
          $match: {
            uuid
          }
        },
        {
          $addFields: {
            upvoteCount: {
              $size: '$upvotes'
            },
            downvoteCount: {
              $size: '$downvotes'
            }
          }
        },
        {
          $addFields: {
            totalVotes: {
              $subtract: ['$upvoteCount', '$downvoteCount']
            }
          }
        }
      ])
      .project({ _id: false, totalVotes: true })
      .toArray()
  )[0].totalVotes;
}
async function endVoting(uuid: string, parent1: number, parent2: number, pioneer: string) {
  const winningSuggestion = await getSuggestion(uuid);

  let newId;
  if (await elementExistsName(winningSuggestion.childName)) {
    newId = (await getElementName(winningSuggestion.childName)).id;
  } else {
    newId = (await getElementCount()).total + 1;

    await database.collection('elements').insertOne({
      id: newId,
      name: winningSuggestion.childName,
      color: winningSuggestion.childColor,
      suggestedBy: winningSuggestion.suggestedBy,
      pioneer,
      pioneerNote: '',
      createdOn: Date.now()
    });
  }

  await database.collection('recipes').insertOne({
    parent1: winningSuggestion.parent1,
    parent2: winningSuggestion.parent2,
    child: newId
  });
  await database.collection('suggestions').deleteMany({ parent1, parent2 });

  // Send the most recent elements to everyone.
  io.sockets.emit('most-recent-elements', await getMostRecentElements(10));

  // Send the total element count to everyone.
  io.sockets.emit('element-count', await getElementCount());

  return `PIONEER-${newId}`;
}

async function voteExists(uuid: string, userToken: string) {
  return ((
    await database.collection('suggestions').find({ uuid }).toArray()
  )[0] as Suggestion).upvotes.includes(userToken);
}
async function downvoteExists(uuid: string, userToken: string) {
  return ((
    await database.collection('suggestions').find({ uuid }).toArray()
  )[0] as Suggestion).downvotes.includes(userToken);
}
export async function submitVote(uuid: string, userToken: string, pioneer: string) {
  if (!(await suggestionExists(uuid))) {
    return 'NO-SUGGESTION';
  }

  let voted = false;
  if (!(await voteExists(uuid, userToken))) {
    await database.collection('suggestions').updateOne({ uuid }, { $push: { upvotes: userToken } });
    voted = true;
  }

  if ((await getUpvotes(uuid)) >= Number(process.env.VOTE_THRESHOLD)) {
    const suggestion = await getSuggestion(uuid);

    return await endVoting(uuid, suggestion.parent1, suggestion.parent2, pioneer);
  }
  if (voted) {
    return 'VOTED';
  }
  return 'ALREADY-VOTED';
}
export async function submitDownvote(uuid: string, userToken: string) {
  if (!(await suggestionExists(uuid))) {
    return 'NO-SUGGESTION';
  }

  let voted = false;
  if (!(await downvoteExists(uuid, userToken))) {
    await database
      .collection('suggestions')
      .updateOne({ uuid }, { $push: { downvotes: userToken } });
    voted = true;
  }

  if (voted) {
    return 'VOTED';
  }
  return 'ALREADY-VOTED';
}
