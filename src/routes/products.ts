import express from 'express';
import { createProduct, getProducts } from '../controllers/products';
import { authenticate } from '../middleware/auth';

const router = express.Router();
router.post('/', authenticate, createProduct);
router.get('/', getProducts);
export default router;
