import { getCollection } from "./db_connection.js";

export async function findAllClients() {
  return getCollection()
    .find({}, { projection: { _id: 0 } })
    .toArray();
}

export async function findOneClient(id) {
  console.log(`Finding client with ID: ${id}`);
  return getCollection().findOne({ id: id });
}

export async function addClient(doc) {
  const res = await getCollection().insertOne(doc);
  return { _id: String(res.insertedId), ...doc };
}

export async function updateClient(doc) {
  if (!doc || doc.id == null) throw new Error("Missing required field: id");
  const { id, ...patchRaw } = doc;

  const patch = Object.fromEntries(
    Object.entries(patchRaw).filter(([, v]) => v !== undefined)
  );

  const result = await getCollection().findOneAndUpdate(
    { id: String(id) },
    { $set: patch },
    {
      returnDocument: "after",
    }
  );

  return result?.value ?? result ?? null;
}

export async function deleteClient(id) {
  const res = await getCollection().deleteOne({ id: id });
  return res.deletedCount > 0;
}
