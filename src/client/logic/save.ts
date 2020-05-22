import axios from 'axios';

export async function getGameData() {
  const existingData = localStorage.getItem('elementalRebornData');
  // Save game.
  if (!existingData) {
    const defaultElementResponse = await axios.get('/api/default-elements');
    localStorage.setItem('elementalRebornData', JSON.stringify(defaultElementResponse.data));

    return defaultElementResponse.data;
  }
  return JSON.parse(existingData);
}
