import express from 'express';
import { createPaymentMethod, getAllPaymentMethods, getPaymentMethod, updatePaymentMethod, deletePaymentMethod } from '../controllers/pagosMetodosControllers.js';

const router = express.Router();

router.post('/', createPaymentMethod);
router.get('/', getAllPaymentMethods);
router.get('/:id', getPaymentMethod);
router.put('/:id', updatePaymentMethod);
router.delete('/:id', deletePaymentMethod);

export default router;
