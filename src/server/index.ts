import { app } from 'fullstack-system';
import { config as setupDotEnv } from 'dotenv';

import {
  setupDatabase,
  getSimpleElement,
  getElementCount,
  recipeExists,
  getChildId
} from './database';

setupDotEnv();

setupDatabase();

app.get('/api/element-count', async (req, res) => {
  res.send(`${await getElementCount()}`);
});
app.get('/api/default-elements', async (req, res) => {
  res.send([
    await getSimpleElement(1),
    await getSimpleElement(2),
    await getSimpleElement(3),
    await getSimpleElement(4)
  ]);
});
app.get('/api/get-recipe/:parent1/:parent2', async (req, res) => {
  if (await recipeExists(Number(req.params.parent1), Number(req.params.parent2))) {
    res.set({ Type: 'Element' });
    res.send(
      await getSimpleElement(
        await getChildId(Number(req.params.parent1), Number(req.params.parent2))
      )
    );
    return;
  }
  res.set({ Type: 'Suggest' });
  res.send();
});
