import 'module-alias/register';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { deserializeUser } from './middleware/auth.middleware';
import { mainRouter } from './routers/main.router';
import { getEnvVariableValue } from './utils/general.utils';

const FRONTEND_AUTHORITY = getEnvVariableValue('FRONTEND_AUTHORITY');
const FRONTEND_DOMAIN = getEnvVariableValue('FRONTEND_DOMAIN');
const FRONTEND_PORT = getEnvVariableValue('FRONTEND_PORT');
const PORT = getEnvVariableValue('PORT');

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: [`${FRONTEND_AUTHORITY}://${FRONTEND_DOMAIN}:${FRONTEND_PORT}`]
}));
app.use(deserializeUser);

app.use(mainRouter);

app.listen(PORT, () => {
    console.log(`App backend listening on port ${PORT}`);
});