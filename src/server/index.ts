import { io, app } from 'fullstack-system';
import { config as setupDotEnv } from 'dotenv';
import bodyParser from 'body-parser';
import * as Sentry from '@sentry/node';

import setupLogin from './socket/login';
import setupStats from './socket/stats';

import { setupDatabase } from './database';

import elementRouter from './api/elements';
import recipeRouter from './api/recipes';
import statRouter from './api/stats';
import suggestionRouter from './api/suggestions';

setupDotEnv();

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0
  });
}

setupDatabase();

io.on('connection', function (socket) {
  setupLogin(socket);
  setupStats(socket);
});

app.use(bodyParser());

app.use('', elementRouter);
app.use('', recipeRouter);
app.use('', statRouter);
app.use('', suggestionRouter);

app.get('/elemental.json', async (req, res) => {
  res.send({
    type: 'reborn',
    name: 'Elemental Reborn Official',
    googleAuth: {
      clientId: '148901687072-c2otormactiabvs9iqacd751e7f62f9b.apps.googleusercontent.com'
    }
  });
});
