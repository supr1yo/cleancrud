import { RequestHandler, Router } from 'express'
import login  from '../controller/user/login';
import signup  from '../controller/user/signup';

const router = Router();

router.post('/signup', signup);

router.post('/login', login);

export default router;