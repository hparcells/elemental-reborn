import { app } from 'fullstack-system';
import { Router } from 'express';

import { verifyGoogleToken } from '../google';

import {
  addSuggestion,
  getRandomLonelySuggestion,
  getTopSuggestions,
  getUpAndComingSuggestion,
  submitDownvote,
  submitVote
} from '../database/suggestions';

const router = Router();

router.post('/api/suggest', async (req, res) => {
  if (req.headers.token && (await verifyGoogleToken(req.headers.token as string))) {
    addSuggestion(req.body.suggestion);
  }
  res.end();
});

router.get('/api/suggestions/:parent1/:parent2', async (req, res) => {
  res.send(await getTopSuggestions(Number(req.params.parent1), Number(req.params.parent2)));
});

router.get('/api/vote/:uuid', async (req, res) => {
  if (req.headers.token) {
    const userId = await verifyGoogleToken(req.headers.token as string);
    if (userId && req.headers.pioneer) {
      res.send(await submitVote(req.params.uuid, userId, req.headers.pioneer as string));
    }
  }
  res.end();
});

router.get('/api/downvote/:uuid', async (req, res) => {
  if (req.headers.token) {
    const userId = await verifyGoogleToken(req.headers.token as string);
    if (userId) {
      res.send(await submitDownvote(req.params.uuid, userId));
    }
  }
  res.end();
});

router.get('/api/up-and-coming', async (req, res) => {
  res.send(await getUpAndComingSuggestion());
});
router.get('/api/lonely', async (req, res) => {
  res.send(await getRandomLonelySuggestion());
});

export default router;
