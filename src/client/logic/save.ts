import axios from 'axios';

export async function getGameData(): Promise<any> {
  const existingData = localStorage.getItem('elementalRebornData');

  // New game.
  if (!existingData) {
    const defaultElementResponse = await axios.get('/api/default-elements');
    localStorage.setItem('elementalRebornData', JSON.stringify(defaultElementResponse.data));
    localStorage.setItem('elementalRebornSaveVersion', '2');

    return defaultElementResponse.data;
  }

  // Existing game.
  if (Number(localStorage.getItem('elementalRebornSaveVersion')) < 2) {
    localStorage.removeItem('elementalRebornData');

    return getGameData();
  }

  return JSON.parse(existingData);
}
