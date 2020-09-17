import { app } from 'fullstack-system';

import { verifyGoogleToken } from '../google';

import {
  addSuggestion,
  getTopSuggestions,
  submitDownvote,
  submitVote
} from '../database/suggestions';

app.post('/api/suggest', async (req, res) => {
  if (req.headers.token && (await verifyGoogleToken(req.headers.token as string))) {
    addSuggestion(req.body.suggestion);
  }
  res.end();
});

app.get('/api/suggestions/:parent1/:parent2', async (req, res) => {
  res.send(await getTopSuggestions(Number(req.params.parent1), Number(req.params.parent2)));
});

app.get('/api/vote/:uuid', async (req, res) => {
  if (req.headers.token) {
    const userId = await verifyGoogleToken(req.headers.token as string);
    if (userId && req.headers.pioneer) {
      res.send(await submitVote(req.params.uuid, userId, req.headers.pioneer as string));
    }
  }
  res.end();
});

app.get('/api/downvote/:uuid', async (req, res) => {
  if (req.headers.token) {
    const userId = await verifyGoogleToken(req.headers.token as string);
    if (userId) {
      res.send(await submitDownvote(req.params.uuid, userId));
    }
  }
  res.end();
});
