import { Router } from 'express';
import { register } from '../controllers/register';
import { login } from '../controllers/login';

const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;
