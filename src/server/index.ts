import { io, app } from 'fullstack-system';
import { config as setupDotEnv } from 'dotenv';
import bodyParser from 'body-parser';

import setupLogin from './socket/login';

import { setupDatabase } from './database';

import './api/elements';
import './api/recipes';
import './api/stats';
import './api/suggestions';

setupDotEnv();

setupDatabase();

io.on('connection', function (socket) {
  setupLogin(socket);
});

app.use(bodyParser());

app.get('/elemental.json', async (req, res) => {
  res.send({
    type: 'reborn',
    name: 'Elemental Reborn Official',
    googleAuth: {
      clientId: '148901687072-c2otormactiabvs9iqacd751e7f62f9b.apps.googleusercontent.com'
    }
  });
});
