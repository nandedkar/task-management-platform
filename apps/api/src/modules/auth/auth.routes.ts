import { Router } from 'express';
import { container } from 'tsyringe';
import { validateRequest } from '../../common/middleware/validate-request';
import { RegisterSchema } from './auth.validation';
import { AuthController } from './auth.controller';

const router = Router();
const controller = container.resolve(AuthController);

router.post('/register', validateRequest(RegisterSchema), controller.register);

export default router;
