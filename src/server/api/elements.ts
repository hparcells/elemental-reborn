import { app } from 'fullstack-system';

import { getFullElement, getSimpleElement } from '../database/elements';

app.get('/api/default-elements', async (req, res) => {
  res.send([
    await getSimpleElement(1),
    await getSimpleElement(2),
    await getSimpleElement(3),
    await getSimpleElement(4)
  ]);
});

app.get('/api/get-element/:elementId', async (req, res) => {
  res.set({ Type: 'Element' });
  res.send(await getSimpleElement(Number(req.params.elementId)));
});

app.get('/api/get-full-element/:elementId', async (req, res) => {
  res.set({ Type: 'Element' });
  res.send(await getFullElement(Number(req.params.elementId)));
});
