import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "CRM";
let collection;

export async function main() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    collection = db.collection("clients");
  } catch (error) {
    console.error("Failed to connect to DB:", error);
    await client.close();
    throw error;
  }
}

export function getCollection() {
  if (!collection) throw new Error("DB not initialized. Call main() first.");
  return collection;
}
