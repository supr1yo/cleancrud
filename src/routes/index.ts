import { Router } from 'express'
import loginRoute from './user'
import signupRoute from './user'
import productRoute from './product'

const router = Router();

router.use('/v1', loginRoute);
router.use('/v1', signupRoute);
router.use('/v1', productRoute)


export default router;