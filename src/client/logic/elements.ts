import axios from 'axios';
import { unique } from '@reverse/array';

import { SimpleElement, ElementColor } from '../../shared/types';
import { RecipeResponseData } from '../types';

import { getGameData } from './save';

export async function getObtainedColors(): Promise<ElementColor[]> {
  return unique(
    (await getGameData()).map((element: SimpleElement) => {
      return element.color;
    })
  );
}

export function earnElement(response: any): RecipeResponseData {
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

    document.getElementById(response.data.color)?.scrollIntoView({ behavior: 'smooth' });

    return { type: 'element', element: response.data };
  }
  return { type: 'element-no-refresh', element: response.data };
}
export async function manualEarnElement(elementId: number) {
  const response = await axios.get(`/api/get-element/${elementId}`);

  earnElement(response);
}
