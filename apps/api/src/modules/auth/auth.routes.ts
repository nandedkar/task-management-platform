import { Router } from 'express';
import { container } from 'tsyringe';
import { validateRequest } from '../../common/middleware/validate-request';
import { LoginSchema, RegisterSchema } from './auth.validation';
import { AuthController } from './auth.controller';

const router = Router();
const controller = container.resolve(AuthController);

router.post('/register', validateRequest(RegisterSchema), controller.register);
router.post('/login', validateRequest(LoginSchema), controller.login);

export default router;
