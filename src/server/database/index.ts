import { MongoClient, Db } from 'mongodb';
import assert from 'assert';

import { ElementColor } from '../../shared/types';

import { elementExists } from './elements';

export let database: Db;

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
  let client: MongoClient;

  if (process.env.NODE_ENV !== 'production') {
    client = new MongoClient(
      `mongodb+srv://hparcells:${process.env.DATABASE_PASSWORD}@elementalreborncluster-b2kc5.mongodb.net/test?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  } else {
    client = new MongoClient(
      `mongodb+srv://hparcells:${process.env.DATABASE_PASSWORD}@elementalreborncluster.oqvwn.mongodb.net/test?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  }

  client.connect((error) => {
    assert.equal(null, error);

    database = client.db('elementalRebornDatabase');

    ensureDefaultElement(1, 'Air', 'sky');
    ensureDefaultElement(2, 'Earth', 'brown');
    ensureDefaultElement(3, 'Fire', 'orange');
    ensureDefaultElement(4, 'Water', 'blue');
  });
}
