import { Element } from '../../shared/types';

import { database } from '.';

export async function elementExists(id: number) {
  return (await database.collection('elements').find({ id }).count()) === 1;
}
export async function elementExistsName(elementName: string) {
  return (
    (
      await database
        .collection('elements')
        .aggregate([
          {
            $project: {
              name: { $toLower: '$name' }
            }
          },
          {
            $match: {
              name: elementName.toLowerCase()
            }
          }
        ])
        .toArray()
    ).length === 1
  );
}

export async function getElementName(elementName: string) {
  return (
    await database
      .collection('elements')
      .aggregate([
        {
          $project: {
            name: { $toLower: '$name' },
            id: true
          }
        },
        {
          $match: {
            name: elementName.toLowerCase()
          }
        }
      ])
      .toArray()
  )[0];
}

export async function getElement(id: number): Promise<Element> {
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
export async function getFullElement(id: number): Promise<Element> {
  return (await database.collection('elements').find({ id }).toArray())[0];
}
