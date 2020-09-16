import axios from 'axios';
import { unique } from '@reverse/array';
import { v4 as uuidv4 } from 'uuid';

import { SimpleElement, ElementColor, ElementCount } from '../../shared/types';
import { SuggestingData } from './types';

import { getGameData } from './save';

import { username } from '../components/App';

export async function getElementCount(): Promise<ElementCount> {
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
function earnElement(response: any) {
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

    // TODO: Test this.
    document.getElementById(response.data.color)?.scrollIntoView();

    return 'element';
  }
  return 'element-no-refresh';
}
export async function getRecipe(parent1: number, parent2: number) {
  const response = await axios.get(`/api/get-recipe/${parent1}/${parent2}`);

  if (response.headers.type === 'Element') {
    return earnElement(response);
  }
  return 'suggest';
}
export async function manualEarnElement(elementId: number) {
  const response = await axios.get(`/api/get-element/${elementId}`);

  earnElement(response);
}
export async function suggestRecipe(suggestingData: SuggestingData, userToken: string) {
  await axios.post(
    '/api/suggest',
    {
      suggestion: {
        uuid: uuidv4(),
        suggestedBy: username,
        parent1: suggestingData.parent1.id,
        parent2: suggestingData.parent2.id,
        childName: suggestingData.childName,
        childColor: suggestingData.childColor,
        upvotes: [],
        downvotes: []
      }
    },
    {
      headers: {
        Token: userToken
      }
    }
  );
}
export async function getSuggestions(parent1: number, parent2: number) {
  return await axios.get(`/api/suggestions/${parent1}/${parent2}`);
}
export async function submitVote(uuid: string, userToken: string) {
  return (
    await axios.get(`/api/vote/${uuid}`, {
      headers: { Token: userToken, Pioneer: username }
    })
  ).data;
}
export async function submitDownvote(uuid: string, userToken: string) {
  return (
    await axios.get(`/api/downvote/${uuid}`, {
      headers: { Token: userToken }
    })
  ).data;
}
