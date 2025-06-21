import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import { authenticate } from '../middleware/auth';
import { requireMaster, requireAdminOrMaster } from '../middleware/roleCheck';

const router = express.Router();

router.use(authenticate);

router.get('/', requireAdminOrMaster, getAllProducts);
router.get('/:id', requireAdminOrMaster, getProductById);
router.post('/', requireMaster, createProduct);
router.put('/:id', requireMaster, updateProduct);
router.delete('/:id', requireMaster, deleteProduct);

export default router;