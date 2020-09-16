import { MongoClient, Db } from 'mongodb';
import assert from 'assert';

import { ElementColor, ElementCount, Suggestion } from '../shared/types';

export let database: Db;

export async function getElementCount(): Promise<ElementCount> {
  const allElements = await database.collection('elements').find().toArray();

  return {
    total: allElements.length,
    sky: allElements.filter((element) => {
      return element.color === 'sky';
    }).length,
    brown: allElements.filter((element) => {
      return element.color === 'brown';
    }).length,
    orange: allElements.filter((element) => {
      return element.color === 'orange';
    }).length,
    blue: allElements.filter((element) => {
      return element.color === 'blue';
    }).length,
    navy: allElements.filter((element) => {
      return element.color === 'navy';
    }).length,
    silver: allElements.filter((element) => {
      return element.color === 'silver';
    }).length,
    purple: allElements.filter((element) => {
      return element.color === 'purple';
    }).length,
    maroon: allElements.filter((element) => {
      return element.color === 'maroon';
    }).length,
    gray: allElements.filter((element) => {
      return element.color === 'gray';
    }).length,
    green: allElements.filter((element) => {
      return element.color === 'green';
    }).length,
    lime: allElements.filter((element) => {
      return element.color === 'lime';
    }).length,
    yellow: allElements.filter((element) => {
      return element.color === 'yellow';
    }).length,
    olive: allElements.filter((element) => {
      return element.color === 'olive';
    }).length,
    white: allElements.filter((element) => {
      return element.color === 'white';
    }).length,
    tan: allElements.filter((element) => {
      return element.color === 'tan';
    }).length,
    black: allElements.filter((element) => {
      return element.color === 'black';
    }).length,
    red: allElements.filter((element) => {
      return element.color === 'red';
    }).length,
    lavender: allElements.filter((element) => {
      return element.color === 'lavender';
    }).length,
    pink: allElements.filter((element) => {
      return element.color === 'pink';
    }).length,
    magenta: allElements.filter((element) => {
      return element.color === 'magenta';
    }).length
  };
}
async function elementExists(id: number) {
  return (await database.collection('elements').find({ id }).count()) === 1;
}
async function elementExistsName(name: string) {
  return (await database.collection('elements').find({ name }).count()) === 1;
}
export async function getElement(id: number) {
  return (await database.collection('elements').find({ id }).toArray())[0];
}
export async function getElementName(name: string) {
  return (await database.collection('elements').find({ name }).toArray())[0];
}
export async function getSimpleElement(id: number) {
  return (
    await database
      .collection('elements')
      .find({ id })
      .project({ _id: false, id: true, name: true, color: true })
      .toArray()
  )[0];
}
export async function recipeExists(parent1: number, parent2: number) {
  return (await database.collection('recipes').find({ parent1, parent2 }).count()) === 1;
}
export async function getChildId(parent1: number, parent2: number) {
  return (
    await database
      .collection('recipes')
      .find({ parent1, parent2 })
      .project({ _id: false, child: true })
      .toArray()
  )[0].child;
}
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
async function getUpvotes(uuid: string) {
  return ((await database.collection('suggestions').find({ uuid }).toArray())[0] as Suggestion)
    .upvotes.length;
}
async function getSuggestion(uuid: string): Promise<Suggestion> {
  return (await database.collection('suggestions').find({ uuid }).toArray())[0];
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

  return 'PIONEER';
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
async function ensureDefaultElement(id: number, name: string, color: ElementColor) {
  if (!(await elementExists(id))) {
    await database.collection('elements').insertOne({
      id,
      name,
      color,
      pioneer: 'Elemental Reborn',
      pioneerNote: 'A default element.',
      createdOn: Date.now()
    });
  }
}
export function setupDatabase() {
  const client = new MongoClient(
    `mongodb+srv://hparcells:${process.env.DATABASE_PASSWORD}@elementalreborncluster-b2kc5.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  client.connect((error) => {
    assert.equal(null, error);

    database = client.db('elementalRebornDatabase');

    ensureDefaultElement(1, 'Air', 'sky');
    ensureDefaultElement(2, 'Earth', 'brown');
    ensureDefaultElement(3, 'Fire', 'orange');
    ensureDefaultElement(4, 'Water', 'blue');
  });
}
