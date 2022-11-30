
import { logInController, logOutController, verifyController } from '@/controllers/auth.controller';
import { Router } from 'express';

export const authRouter = Router();

authRouter.post('/login', logInController);
authRouter.post('/logout', logOutController);
authRouter.post('/verify', verifyController);