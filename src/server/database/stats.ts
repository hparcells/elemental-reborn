import { unique } from '@reverse/array';

import { database } from '.';

import { ElementCount } from '../../shared/types';
import { getElement } from './elements';
import { getRecipe } from './recipes';

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

export async function getSankeyDataRecursive(
  elementId: number
): Promise<[string, string, number | string][]> {
  const recipe = await getRecipe(elementId);
  const parent1 = await getElement(recipe.parent1);
  const parent2 = await getElement(recipe.parent2);
  const child = (await getElement(elementId)).name;

  let returnArray: [string, string, number | string][] = [];

  returnArray.push([parent1.name, child, 1]);
  returnArray.push([parent2.name, child, 1]);

  if (parent1.id > 4) {
    returnArray = returnArray.concat(await getSankeyDataRecursive(parent1.id));
  }
  if (parent2.id > 4) {
    returnArray = returnArray.concat(await getSankeyDataRecursive(parent2.id));
  }

  return returnArray;
}
export async function getSankeyData(elementId: number) {
  let sankeyData = await getSankeyDataRecursive(elementId);

  sankeyData = unique(
    sankeyData.map((sankeyDataRow) => {
      return JSON.stringify(sankeyDataRow);
    })
  )
    .map((stringedSankeyDataRow) => {
      return {
        stringedSankeyDataRow,
        count: sankeyData
          .map((sankeyDataRow) => {
            return JSON.stringify(sankeyDataRow);
          })
          .filter((sankeyDataRow) => {
            return sankeyDataRow === stringedSankeyDataRow;
          }).length
      };
    })
    .map((countedSankeyDataRow) => {
      const parsedCountedSankeyDataRow = JSON.parse(countedSankeyDataRow.stringedSankeyDataRow);

      return [
        parsedCountedSankeyDataRow[0],
        parsedCountedSankeyDataRow[1],
        countedSankeyDataRow.count
      ];
    });

  sankeyData.splice(0, 0, ['From', 'To', 'Weight']);
  return sankeyData;
}

export async function getFlowchartData(elementId: number) {
  return 'Not implemented.';
}
