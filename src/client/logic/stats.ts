import { hookFromState, SimpleState } from '@reverse/state';
import axios from 'axios';

export const playerCount = new SimpleState<number>(1);
export const usePlayerCount = hookFromState(playerCount);

export function setPlayerCount(newPlayerCount: number) {
  playerCount.set(newPlayerCount);
}

export async function getSankeyData(elementId: number) {
  return (await axios.get(`/api/sankey/${elementId}`)).data;
}
