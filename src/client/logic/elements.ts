import axios from 'axios';
import { unique } from '@reverse/array';

import { SimpleElement, ElementColor } from '../../shared/types';

import { getGameData } from './save';

export async function getElementCount(): Promise<number> {
  const elementCountResponse = await axios.get('/api/element-count');
  return Number(elementCountResponse.data);
}
export async function getObtainedColors(): Promise<ElementColor[]> {
  return unique(
    (await getGameData()).map((element: SimpleElement) => {
      return element.color;
    })
  );
}
export async function getRecipe(parent1: number, parent2: number) {
  const response = await axios.get(`/api/get-recipe/${parent1}/${parent2}`);

  if (response.headers.type === 'Element') {
    const existingData = localStorage.getItem('elementalRebornData');

    if (!existingData) {
      throw new Error('No data exists. Try reloading the page.');
    }

    const data: SimpleElement[] = JSON.parse(existingData);
    if (
      !data
        .map((element: SimpleElement) => {
          return element.id;
        })
        .includes(response.data.id)
    ) {
      data.push(response.data);
      localStorage.setItem('elementalRebornData', JSON.stringify(data));

      return 'element';
    }
    return 'element-no-refresh';
  }
  return 'suggest';
}
