import axios from 'axios';
import { unique } from '@reverse/array';

import { SimpleElement, ElementColor } from '../../shared/types';

import { getGameData } from './save';

export async function getElementCount(): Promise<string> {
  const elementCountResponse = await axios.get('/api/element-count');
  return elementCountResponse.data;
}
export async function getObtainedColors(): Promise<ElementColor[]> {
  return unique(
    (await getGameData()).map((element: SimpleElement) => {
      return element.color;
    })
  );
}
