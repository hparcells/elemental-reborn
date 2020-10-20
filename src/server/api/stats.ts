import { Router } from 'express';

import { elementExists } from '../database/elements';
import { getElementCount, getElementPath, getMostRecentElements } from '../database/stats';

const router = Router();

const pathCache: { [type: number]: string[] } = {};

router.get('/api/element-count', async (req, res) => {
  res.send(await getElementCount());
});

router.get('/api/path/:elementId', async (req, res) => {
  const elementId = Number(req.params.elementId);

  if (elementId > 0 && (await elementExists(elementId))) {
    if (pathCache.hasOwnProperty(elementId)) {
      res.send(pathCache[elementId]);
      return;
    }

    const elementPath = await getElementPath(elementId);
    pathCache[elementId] = elementPath;
    res.send(elementPath);

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
