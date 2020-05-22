import { app } from 'fullstack-system';
import { config as setupDotEnv } from 'dotenv';

import { setupDatabase, getSimpleElement, getElementCount } from './database';

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
