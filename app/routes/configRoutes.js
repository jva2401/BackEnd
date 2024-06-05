
import express from 'express';
import { createConfig, getAllConfigs, getConfig, updateConfig, deleteConfig } from '../controllers/configImpresionControllers.js';

const router = express.Router();

router.post('/', createConfig);
router.get('/', getAllConfigs);
router.get('/:id', getConfig);
router.put('/:id', updateConfig);
router.delete('/:id', deleteConfig);

export default router;
