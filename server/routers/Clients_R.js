import { Router } from 'express';
import { addClient, deleteClient, findOneClient, updateClient } from '../db/dbUtils.js';
import { verifyToken } from '../middleware/auth.js';

export const clientRouter = Router();

clientRouter.use(verifyToken);

clientRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const client = await findOneClient(id);
    if (!client) return res.status(404).json({ success: false, error: 'Client not found' });
    if (client.userId !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }
    res.json(client);
  } catch (error) {
    console.error('GET /clients/:id error:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error' });
  }
});

clientRouter.post('/', async (req, res) => {
  try {
    const clientData = {
      ...req.body,
      userId: req.user.id,
    };
    const client = await addClient(clientData);
    res.status(201).json(client);
  } catch (error) {
    console.error('POST /clients error:', error);
    res.status(400).json({ success: false, error: error.message || 'Failed to add client' });
  }
});

clientRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const client = await findOneClient(id);
    if (!client) return res.status(404).json({ success: false, error: 'Client not found' });
    if (client.userId !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }
    const updated = await updateClient(id, req.body);
    res.json(updated);
  } catch (error) {
    console.error('PUT /clients/:id error:', error);
    res.status(400).json({ success: false, error: error.message || 'Failed to update client' });
  }
});

clientRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const client = await findOneClient(id);
    if (!client) return res.status(404).json({ success: false, error: 'Client not found' });
    if (client.userId !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    await deleteClient(id);
    res.json({ success: true });
  } catch (error) {
    console.error('DELETE /clients/:id error:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to delete client' });
  }
});
