
import { decodeAccessToken } from '@/utils/auth.utils';
import { getEnvVariableValue } from '@/utils/general.utils';
import type { RequestHandler } from 'express';

const ACCESS_TOKEN_COOKIE_NAME = getEnvVariableValue('ACCESS_TOKEN_COOKIE_NAME');

export const deserializeUser: RequestHandler = (req, res, next) => {
    delete req.userUuid;
    const accessToken: string | undefined = req.cookies[ACCESS_TOKEN_COOKIE_NAME];
    if (!accessToken) return next();
    try {
        const payload = decodeAccessToken(accessToken);
        req.userUuid = payload.personUuid;
        return next();
    } catch (err) {
        console.log(err);
        return res.status(401).send('Access token verification failed!');
    }
};