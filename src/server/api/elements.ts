import { app } from 'fullstack-system';
import { Router } from 'express';

import { getFullElement, getSimpleElement } from '../database/elements';

const router = Router();

router.get('/api/default-elements', async (req, res) => {
  res.send([
    await getSimpleElement(1),
    await getSimpleElement(2),
    await getSimpleElement(3),
    await getSimpleElement(4)
  ]);
});

router.get('/api/get-element/:elementId', async (req, res) => {
  res.set({ Type: 'Element' });
  res.send((await getSimpleElement(Number(req.params.elementId))) || []);
});

router.get('/api/get-full-element/:elementId', async (req, res) => {
  res.set({ Type: 'Element' });
  res.send((await getFullElement(Number(req.params.elementId))) || []);
});

export default router;
