import { app } from 'fullstack-system';
import { Router } from 'express';

import { getSimpleElement } from '../database/elements';
import { getChildId, recipeExists } from '../database/recipes';

const router = Router();

router.get('/api/get-recipe/:parent1/:parent2', async (req, res) => {
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
  res.send([]);
});

export default router;
