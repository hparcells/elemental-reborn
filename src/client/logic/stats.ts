import { hookFromState, SimpleState } from '@reverse/state';
import axios from 'axios';

import { MostRecentElement, ElementCount } from '../../shared/types';

// Player count.
export const playerCount = new SimpleState<number>(1);
export const usePlayerCount = hookFromState(playerCount);
export function setPlayerCount(newPlayerCount: number) {
  playerCount.set(newPlayerCount);
}

// Most recent elements.
export const mostRecentElements = new SimpleState<MostRecentElement[]>(null as any);
export const useMostRecentElements = hookFromState(mostRecentElements);
export function setMostRecentElements(recent: any[]) {
  mostRecentElements.set(recent);
}

// Element count.
export const elementCount = new SimpleState<ElementCount>(null as any);
export const useElementCount = hookFromState(elementCount);
export function setElementCount(newElementCount: ElementCount) {
  elementCount.set(newElementCount);
}

export async function getElementCount(): Promise<ElementCount> {
  const elementCountResponse = await axios.get('/api/element-count');
  return elementCountResponse.data;
}

export async function getSankeyData(elementId: number) {
  return (await axios.get(`/api/sankey/${elementId}`)).data;
}

export async function getElementPath(elementId: number) {
  return (await axios.get(`/api/path/${elementId}`)).data;
}
