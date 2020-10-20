import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { hookFromState, SimpleState } from '@reverse/state';

import { SuggestingData } from '../../shared/types';

import { login } from '../components/App';

// Suggestion Window
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
export const canSuggest = new SimpleState<boolean>(false);
export const useCanSuggest = hookFromState(canSuggest);
export function setCanSuggest(newCanSuggest: boolean) {
  canSuggest.set(newCanSuggest);
}

export async function suggestRecipe(suggestingData: SuggestingData) {
  await axios.post(
    '/api/suggest',
    {
      suggestion: {
        uuid: uuidv4(),
        suggestedBy: login.username,
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
        Token: login.token
      }
    }
  );
}
export async function getSuggestions(parent1: number, parent2: number) {
  return await axios.get(`/api/suggestions/${parent1}/${parent2}`);
}

export async function submitVote(uuid: string) {
  return (
    await axios.get(`/api/vote/${uuid}`, {
      headers: { Token: login.token, Pioneer: login.username }
    })
  ).data;
}
export async function submitDownvote(uuid: string) {
  return (
    await axios.get(`/api/downvote/${uuid}`, {
      headers: { Token: login.token }
    })
  ).data;
}

export async function getUpAndComingSuggestion(): Promise<SuggestingData> {
  return (await axios.get('/api/up-and-coming')).data;
}

export async function getRandomLonelySuggestion(): Promise<SuggestingData> {
  return (await axios.get('/api/lonely')).data;
}
