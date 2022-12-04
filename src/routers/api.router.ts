
import { getPersonByUuidController } from '@/controllers/person.controller';
import { Router } from 'express';

export const apiRouter = Router();

apiRouter.get('/persons/:personUuid', getPersonByUuidController);