import { hookFromState, SimpleState } from '@reverse/state';
import axios from 'axios';

import { ElementCount } from '../../shared/types';

export const playerCount = new SimpleState<number>(1);
export const usePlayerCount = hookFromState(playerCount);

export async function getElementCount(): Promise<ElementCount> {
  const elementCountResponse = await axios.get('/api/element-count');
  return elementCountResponse.data;
}

export function setPlayerCount(newPlayerCount: number) {
  playerCount.set(newPlayerCount);
}

export async function getSankeyData(elementId: number) {
  return (await axios.get(`/api/sankey/${elementId}`)).data;
}

export async function getElementPath(elementId: number) {
  return (await axios.get(`/api/path/${elementId}`)).data;
}
