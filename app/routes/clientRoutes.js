import express from 'express';
import { createClient, getAllClients, getClient, updateClient, deleteClient } from '../controllers/clientesControllers.js';

const router = express.Router();

router.post('/', createClient);
router.get('/', getAllClients);
router.get('/:id', getClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;
