import { MongoClient, Db } from 'mongodb';

const DATABASE_URL = `mongodb+srv://hparcells:${process.env.DATABASE_PASSWORD}@elementalreborncluster-b2kc5.mongodb.net/test?retryWrites=true&w=majority`;

export let database: Db;

export function setupDatabase() {
  const client = new MongoClient(DATABASE_URL, { useNewUrlParser: true });

  client.connect(() => {
    database = client.db('elementalRebornDatabase');
  });
}
