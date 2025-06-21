import express from 'express';
import {
  getAllInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
} from '../controllers/inventoryController';
import { authenticate } from '../middleware/auth';
import { requireMaster, requireAdminOrMaster } from '../middleware/roleCheck';

const router = express.Router();

router.use(authenticate);

router.get('/', requireAdminOrMaster, getAllInventory);
router.get('/:id', requireAdminOrMaster, getInventoryById);
router.post('/', requireMaster, createInventory);
router.put('/:id', requireMaster, updateInventory);
router.delete('/:id', requireMaster, deleteInventory);

export default router;