import { RequestHandler, Router } from 'express'
import login  from '../controller/user/login';
import signup  from '../controller/user/signup';

const router = Router();

router.post('/signup', signup as unknown as RequestHandler);

router.post('/login', login as unknown as RequestHandler);

export default router;