import express from 'express';
import { createInvoice, getAllInvoices, getInvoice, updateInvoice, deleteInvoice } from '../controllers/facturasControllers.js';

const router = express.Router();

router.post('/', createInvoice);
router.get('/', getAllInvoices);
router.get('/:id', getInvoice);
router.put('/:id', updateInvoice);
router.delete('/:id', deleteInvoice);

export default router;
