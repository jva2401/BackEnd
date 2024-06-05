import express from 'express';

import productRoutes from './productRoutes.js';
import changeHistoryRoutes from './changeHistoryRoutes.js';
import invoiceRoutes from './invoiceRoutes.js';
import deletionRoutes from './deletionRoutes.js';
import configRoutes from './configRoutes.js';
import clientRoutes from './clientRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import paymentMethodRoutes from './paymentMethodRoutes.js';


import userRoutes from './userRoutes.js';

import loginRoute from './authRoutes.js';


const router = express.Router();

router.use('/', userRoutes);
router.use('/auth', loginRoute);

router.use('/products', productRoutes);
router.use('/clients', clientRoutes);
router.use('/payments', paymentRoutes);
router.use('/change-history', changeHistoryRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/deletions', deletionRoutes);
router.use('/config', configRoutes);
router.use('/payment-methods', paymentMethodRoutes);


export default router;
