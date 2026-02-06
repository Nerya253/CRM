import { Router } from 'express';
import { addUser, deleteUser, findAllUsers, findClientsByUserId, findOneUser, loginUser, registerUser, updateUser } from '../db/dbUtils.js';
import { requireAdmin, verifyToken } from '../middleware/auth.js';

export const userRouter = Router();

userRouter.get('/', verifyToken, requireAdmin, async (_req, res) => {
  try {
    const users = await findAllUsers();
    res.json(users);
    console.log(users);
  } catch (error) {
    console.error('GET /users error:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error' });
  }
});

userRouter.get('/currentUserClients', verifyToken, async (req, res) => {
  try {
    const clients = await findClientsByUserId(req.user.id);
    res.json(clients);
  } catch (error) {
    console.error('GET /users/currentUserClients error:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error' });
  }
});

userRouter.get('/currentUser', verifyToken, async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ success: false, error: 'Unauthorized' });

    const user = await findOneUser(userId);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ user });
  } catch (error) {
    console.error('GET /users/currentUser error:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error' });
  }
});

userRouter.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== 'admin' && req.user.id !== id) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    const user = await findOneUser(id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('GET /users/:id error:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error' });
  }
});

userRouter.post('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const user = await addUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('POST /users error:', error);
    res.status(400).json({ success: false, error: error.message || 'Failed to add user' });
  }
});

userRouter.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.role !== 'admin' && req.user.id !== id) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }
    const updated = await updateUser(id, req.body);
    if (!updated) return res.status(404).json({ success: false, error: 'User not found' });
    res.json(updated);
  } catch (error) {
    console.error('PUT /users/:id error:', error);
    res.status(400).json({ success: false, error: error.message || 'Failed to update user' });
  }
});

userRouter.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.id === id) {
      return res.status(400).json({ success: false, error: 'You cannot delete yourself' });
    }

    const deleted = await deleteUser(id);
    if (!deleted) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true });
  } catch (error) {
    console.error('DELETE /users/:id error:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to delete user' });
  }
});

userRouter.post('/register', async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('POST /users/register error:', error);
    res.status(400).json({ success: false, error: error.message || 'Failed to register' });
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    const { user, token } = await loginUser(req.body);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ user, token });
  } catch (error) {
    console.error('POST /users/login error:', error);
    res.status(400).json({ success: false, error: error.message || 'Failed to login' });
  }
});

userRouter.post('/logout', verifyToken, async (_req, res) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    res.status(200).json({ message: 'logout successful' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message || 'Failed to logout' });
  }
});
