
import type { RequestHandler } from 'express';
import { getEnvVariableValue } from '@/utils/general.utils';
import { getPersonByEmail } from '@/models/person.model';
import { generateAccessToken, verifyCredentials } from '@/utils/auth.utils';

const ACCESS_TOKEN_COOKIE_NAME = getEnvVariableValue('ACCESS_TOKEN_COOKIE_NAME');
const ACCESS_TOKEN_LIFESPAN = parseInt(getEnvVariableValue('ACCESS_TOKEN_LIFESPAN'));

export const logInController: RequestHandler = async (req, res) => {

    const email: string | undefined = req.body.email;
    const password: string | undefined = req.body.password;

    if (!email) return res.status(400).send('Request body is missing an email property!');
    if (!password) return res.status(400).send('Request body is missing a password property!');

    try {
        const user = await getPersonByEmail(email);
        if (!user) return res.status(401).send('Incorrect email or password!');
        const verified = await verifyCredentials(email, password);
        if (!verified) return res.status(401).send('Incorrect email or password!');
        const accessToken = generateAccessToken(user.person_uuid);
        res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
            httpOnly: true,
            maxAge: ACCESS_TOKEN_LIFESPAN
        });
        const responseBody = { person_uuid: user.person_uuid };
        return res.status(200).send(responseBody);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Error logging in!');
    }
};

export const logOutController: RequestHandler = (req, res) => {
    delete req.userUuid;
    res.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
    return res.status(204).send('Successfully logged out!');
};

export const verifyController: RequestHandler = (req, res) => {

    const claimedUserUuid: string | undefined | null = req.body.person_uuid;
    const userUuid: string | undefined = req.userUuid;

    let verified = false;
    const responseBody = { verified };

    if (!claimedUserUuid) return res.status(401).send(responseBody);
    if (!userUuid) return res.status(401).send(responseBody);

    verified = claimedUserUuid === userUuid;

    if (verified) return res.status(200).send(responseBody);

    // For safety reasons, log user out when verification fails.
    delete req.userUuid;
    res.clearCookie(ACCESS_TOKEN_COOKIE_NAME);

    return res.status(401).send(responseBody);
};