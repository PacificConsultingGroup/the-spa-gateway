
import { Router } from 'express';
import { apiRouter } from './api/api.router';
import { authRouter } from './auth/auth.router';

export const mainRouter = Router();

mainRouter.use('/api', apiRouter);
mainRouter.use('/auth', authRouter);