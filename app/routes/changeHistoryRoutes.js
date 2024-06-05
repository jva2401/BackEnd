import express from 'express';
import { createHistory, getAllHistories, getHistory, updateHistory, deleteHistory } from '../controllers/historialCambiosControllers.js';

const router = express.Router();

router.post('/', createHistory);
router.get('/', getAllHistories);
router.get('/:id', getHistory);
router.put('/:id', updateHistory);
router.delete('/:id', deleteHistory);

export default router;
