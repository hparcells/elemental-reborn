import axios from 'axios';

import { earnElement } from './elements';

import { SimpleElement } from '../../shared/types';
import { RecipeResponseData } from '../types';

export async function getRecipe(parent1: number, parent2: number): Promise<RecipeResponseData> {
  const response = await axios.get(`/api/get-recipe/${parent1}/${parent2}`);

  if (response.headers.type === 'Element') {
    return earnElement(response);
  }
  return { type: 'suggest' };
}
