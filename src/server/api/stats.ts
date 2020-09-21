import { app } from 'fullstack-system';
import { Router } from 'express';

import { elementExists } from '../database/elements';
import {
  getElementCount,
  getElementPath,
  getFlowchartData,
  getMostRecentElements,
  getSankeyData
} from '../database/stats';

const router = Router();

router.get('/api/element-count', async (req, res) => {
  res.send(await getElementCount());
});

router.get('/api/sankey/:elementId', async (req, res) => {
  const elementId = Number(req.params.elementId);

  if (elementId > 0 && (await elementExists(elementId))) {
    res.send(await getSankeyData(elementId));
  }
  res.end();
});

router.get('/api/flowchart/:elementId', async (req, res) => {
  const elementId = Number(req.params.elementId);

  if (elementId > 0 && (await elementExists(elementId))) {
    res.send(await getFlowchartData(elementId));
  }
  res.end();
});

router.get('/api/path/:elementId', async (req, res) => {
  const elementId = Number(req.params.elementId);

  if (elementId > 0 && (await elementExists(elementId))) {
    res.send(await getElementPath(elementId));
    return;
  }
  res.send([]);
});

router.get('/api/most-recent/:count', async (req, res) => {
  const count = Number(req.params.count);

  if (!isNaN(count) && count > 0) {
    res.send(await getMostRecentElements(count));
    return;
  }
  res.send([]);
});

export default router;
