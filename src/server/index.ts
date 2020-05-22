import { app } from 'fullstack-system';
import { config as setupDotEnv } from 'dotenv';

import { setupDatabase } from './database';

setupDotEnv();

setupDatabase();

app.get('/api-test', (req, res) => {
  res.end('It Works!');
});
