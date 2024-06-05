import express from 'express';
import { createPayment, getAllPayments, getPayment, updatePayment, deletePayment } from '../controllers/pagosControllers.js';

const router = express.Router();

router.post('/', createPayment);
router.get('/', getAllPayments);
router.get('/:id', getPayment);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);

export default router;
