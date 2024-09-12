import { Router, Request, Response } from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../handlers/productHandlers'

interface ProductParams {
    id: string;
  }

const router: Router = Router();

router.get('/products', (req: Request, res: Response) => getAllProducts(req, res));
router.get('/products/:id', (req: Request<ProductParams>, res: Response) => getProductById(req, res));
router.post('/products', (req: Request, res: Response) => createProduct(req, res));
router.put('/products/:id', (req: Request<ProductParams>, res: Response) => updateProduct(req, res));
router.delete('/products/:id', (req: Request<ProductParams>, res: Response) => deleteProduct(req, res));

export default router;