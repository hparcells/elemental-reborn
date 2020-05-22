import { MongoClient, Db } from 'mongodb';
import assert from 'assert';

import { ElementColor } from '../shared/types';

export let database: Db;

export async function getElementCount() {
  return await database.collection('elements').countDocuments();
}
async function elementExists(id: number) {
  return (await database.collection('elements').find({ id }).count()) === 1;
}
export async function getElement(id: number) {
  return (await database.collection('elements').find({ id }).toArray())[0];
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
async function ensureDefaultElement(id: number, name: string, color: ElementColor) {
  if (!(await elementExists(id))) {
    await database.collection('elements').insertOne({
      id,
      name,
      color,
      parent1: null,
      parent2: null,
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

    console.log('Database ready!');
  });
}
