import express from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';
import { authenticate } from '../middleware/auth';
import { requireMaster, requireAdminOrMaster } from '../middleware/roleCheck';

const router = express.Router();

router.use(authenticate);

router.get('/', requireAdminOrMaster, getAllCategories);
router.get('/:id', requireAdminOrMaster, getCategoryById);
router.post('/', requireMaster, createCategory);
router.put('/:id', requireMaster, updateCategory);
router.delete('/:id', requireMaster, deleteCategory);

export default router;