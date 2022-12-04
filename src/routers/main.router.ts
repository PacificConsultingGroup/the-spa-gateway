
import { requireUserSession } from '@/middleware/auth.middleware';
import { Router } from 'express';
import { apiRouter } from './api.router';
import { authRouter } from './auth.router';

export const mainRouter = Router();

mainRouter.use('/api', requireUserSession, apiRouter);
mainRouter.use('/auth', authRouter);