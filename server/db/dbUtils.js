import { getCollection } from "./db_connection.js";

export async function findAllClients() {
  return getCollection().find({}).toArray();
}

export async function addClient(doc) {
  const requiredFields = ["id", "name", "phone", "mail"];
  for (const field of requiredFields) {
    if (!doc[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  const result = await getCollection().insertOne(doc);
  return { _id: result.insertedId, ...doc };
}
