import express from 'express';
import { createDeletion, getAllDeletions, getDeletion, updateDeletion, deleteDeletion } from '../controllers/delFacturasControllers.js';

const router = express.Router();

router.post('/', createDeletion);
router.get('/', getAllDeletions);
router.get('/:id', getDeletion);
router.put('/:id', updateDeletion);
router.delete('/:id', deleteDeletion);

export default router;
