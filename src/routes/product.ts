import { Router } from 'express';
import { RequestHandler } from 'express';
import getAllProducts from '../controller/product/getAllProducts';
import createProduct from '../controller/product/createProduct';
import getProductById from '../controller/product/getAllProducts';
import updateProduct from '../controller/product/updateProduct';
import deleteProduct from '../controller/product/deleteProduct';

const router = Router();

router.get('/products', getAllProducts as unknown as RequestHandler);
router.post('/products', createProduct as unknown as RequestHandler);
router.get('/products/:id', getProductById as unknown as RequestHandler);
router.put('/products/:id', updateProduct as unknown as RequestHandler);
router.delete('/products/:id', deleteProduct as unknown as RequestHandler);

export default router;
