import { Router } from 'express';
import { container } from 'tsyringe';
import { validateRequest } from '../../common/middleware/validate-request';
import { LoginSchema, RegisterSchema } from './auth.validation';
import { AuthController } from './auth.controller';
import { authenticate } from './middlewares/authenticate.middleware';

const router = Router();
const controller = container.resolve(AuthController);

router.post('/register', validateRequest(RegisterSchema), controller.register);
router.post('/login', validateRequest(LoginSchema), controller.login);
router.get('/me', authenticate, controller.getCurrentUser);

export default router;
