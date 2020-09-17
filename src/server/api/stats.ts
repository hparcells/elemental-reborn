import { app } from 'fullstack-system';
import { Router } from 'express';

import { elementExists } from '../database/elements';
import { getElementCount, getFlowchartData, getSankeyData } from '../database/stats';

const router = Router();

router.get('/api/element-count', async (req, res) => {
  res.send(await getElementCount());
});

router.get('/api/sankey/:elementId', async (req, res) => {
  const elementId = Number(req.params.elementId);

  if (elementExists(elementId)) {
    res.send(await getSankeyData(elementId));
  }
  res.end();
});

router.get('/api/flowchart/:elementId', async (req, res) => {
  const elementId = Number(req.params.elementId);

  if (elementExists(elementId)) {
    res.send(await getFlowchartData(elementId));
  }
  res.end();
});

export default router;
