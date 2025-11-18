import bcrypt from 'bcrypt';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { isEmail } from '../utils/helpers.js';
import { clientsCollection, usersCollection } from './db_connection.js';

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY = process.env.JWT_EXPIRY || '1d';

// CLIENTS CRUD
export async function findClientsByUserId(userId) {
  return clientsCollection.find({ userId }).toArray();
}

export async function findOneClient(id) {
  return clientsCollection.findOne({ id });
}

export async function addClient({ id, name, phone, email, userId, description }) {
  if (!id || !name || !phone || !email || !userId) throw new Error('Missing required fields');

  email = email.trim().toLowerCase();
  if (!isEmail(email)) throw new Error('Invalid email');

  const existing = await clientsCollection.findOne({ $or: [{ email }, { id }] });
  if (existing) throw new Error('client already exists');

  const doc = {
    id,
    name,
    phone,
    email,
    userId,
    description: description ?? '',
  };
  await clientsCollection.insertOne(doc);
  return doc;
}

export async function updateClient(id, updateFields = {}) {
  if (!id) throw new Error('Missing id');
  if (!updateFields || Object.keys(updateFields).length === 0) throw new Error('No data to update');

  const current = await clientsCollection.findOne({ id });
  if (!current) throw new Error("Client doesn't exist");

  const newEmail = updateFields.email;
  const newId = updateFields.id;

  if (newEmail && newEmail !== current.email) {
    if (!isEmail(newEmail)) throw new Error('Invalid email');

    const existsEmail = await clientsCollection.findOne({
      email: newEmail,
      id: { $ne: id },
    });

    if (existsEmail) throw new Error('Email already exists');
  }

  if (newId && newId !== current.id) {
    const existsId = await clientsCollection.findOne({
      id: newId,
      id: { $ne: id },
    });

    if (existsId) throw new Error('ID already exists');
  }

  await clientsCollection.updateOne({ id }, { $set: updateFields });

  return clientsCollection.findOne({ id });
}

export async function deleteClient(id) {
  const result = await clientsCollection.deleteOne({ id });
  return result.deletedCount > 0;
}

// USERS CRUD
export async function findAllUsers() {
  return usersCollection.find({}, { projection: { password: 0 } }).toArray();
}

export async function findOneUser(id) {
  return usersCollection.findOne({ id }, { projection: { password: 0 } });
}

export async function addUser({ id, name, email, role, phone, password }) {
  if (!id || !name || !email || !password) throw new Error('Missing required fields');

  email = email.trim().toLowerCase();
  if (!isEmail(email)) throw new Error('Invalid email');

  const existing = await usersCollection.findOne({ $or: [{ email }, { id }] });
  if (existing) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const doc = {
    id,
    name,
    role: role || 'user',
    email,
    phone,
    password: hashedPassword,
  };
  await usersCollection.insertOne(doc);
  const { password: hide, ...safe } = doc;
  return safe;
}

export async function updateUser(id, updateFields = {}) {
  if (!id) throw new Error('Missing id');
  if (!updateFields || Object.keys(updateFields).length === 0) throw new Error('No data to update');

  const current = await usersCollection.findOne({ id });
  if (!current) throw new Error("User doesn't exist");

  const newEmail = updateFields.email;
  const newId = updateFields.id;

  if (newEmail && newEmail !== current.email) {
    if (!isEmail(newEmail)) throw new Error('Invalid email');

    const existsEmail = await usersCollection.findOne({
      email: newEmail,
      id: { $ne: id },
    });

    if (existsEmail) throw new Error('Email already exists');
  }

  if (newId && newId !== current.id) {
    const existsId = await usersCollection.findOne({
      id: newId,
      id: { $ne: id },
    });

    if (existsId) throw new Error('ID already exists');
  }

  await usersCollection.updateOne({ id }, { $set: updateFields });

  return usersCollection.findOne({ id }, { projection: { password: 0 } });
}

export async function deleteUser(id) {
  const result = await usersCollection.deleteOne({ id });
  return result.deletedCount > 0;
}

// AUTH
export async function registerUser({ id, name, email, phone, password, role }) {
  return addUser({ id, name, email, phone, password, role });
}

export async function loginUser({ email, password }) {
  if (!email || !password) throw new Error('Please enter email and password');

  email = email.trim().toLowerCase();

  const user = await usersCollection.findOne({ email });
  if (!user) throw new Error('Invalid email or password');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Invalid email or password');

  const token = jwt.sign({ id: user.id, role: user.role || 'user' }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token,
  };
}
