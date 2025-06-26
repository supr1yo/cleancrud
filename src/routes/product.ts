import { Router } from 'express';
import getAllProducts from '../controller/product/getAllProducts';
import createProduct from '../controller/product/createProduct';
import getProductById from '../controller/product/getProductById';
import updateProduct from '../controller/product/updateProduct';
import deleteProduct from '../controller/product/deleteProduct';
import auth from '../middleware/auth';

const router = Router();

router.get('/products',auth, getAllProducts);
router.post('/products', auth, createProduct);
router.get('/products/:id', auth, getProductById);
router.put('/products/:id', auth, updateProduct );
router.delete('/products/:id', auth, deleteProduct);

export default router;
