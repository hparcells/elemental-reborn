import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { hookFromState, SimpleState } from '@reverse/state';

import { SuggestingData } from '../../shared/types';

import { username } from '../components/App';

// Suggesting data.
export const isSuggesting = new SimpleState<boolean>(false);
export const useIsSuggesting = hookFromState(isSuggesting);
export function setIsSuggesting(newIsSuggesting: boolean) {
  isSuggesting.set(newIsSuggesting);
}
export const suggestingData = new SimpleState<SuggestingData>(null as any);
export const useSuggestingData = hookFromState(suggestingData);
export function setSuggestingData(newSuggestingData: SuggestingData) {
  suggestingData.set(newSuggestingData);
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

export async function getUpAndComingSuggestion(): Promise<SuggestingData> {
  return (await axios.get('/api/up-and-coming')).data;
}

export async function getRandomLonelySuggestion(): Promise<SuggestingData> {
  return (await axios.get('/api/lonely')).data;
}
