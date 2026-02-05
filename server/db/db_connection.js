import 'dotenv/config';
import { MongoClient } from 'mongodb';

const url = process.env.MONGO_URI || process.env.MONGO_URL || 'mongodb://localhost:27017';

const client = new MongoClient(url);

const DB_NAME = 'CRM';
export let clientsCollection;
export let usersCollection;

export async function main() {
  try {
    console.log('Attempting to connect to MongoDB at:', url);
    await client.connect();
    console.log('Connected successfully to MongoDB');
    const db = client.db(DB_NAME);
    clientsCollection = db.collection('clients');
    usersCollection = db.collection('users');
  } catch (error) {
    console.error('Failed to connect to DB:', error);
    process.exit(1);
  }
}
