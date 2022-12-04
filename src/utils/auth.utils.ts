
import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import type { Person } from '@/schema/Person';
import { getPersonByEmail } from '@/models/person.model';
import { getEnvVariableValue } from './general.utils';

type AccessTokenPayload = JwtPayload & { personUuid: Person['person_uuid'] };

export function generateAccessToken(personUuid: Person['person_uuid']) {
    const accessTokenSecret = getEnvVariableValue('ACCESS_TOKEN_SECRET');
    const accessToken = jwt.sign({ personUuid }, accessTokenSecret);
    return accessToken;
}

export function decodeAccessToken(accessToken: string): AccessTokenPayload {
    const payload = jwt.verify(accessToken, getEnvVariableValue('ACCESS_TOKEN_SECRET')) as AccessTokenPayload;
    if (typeof payload === 'string' || !payload.personUuid) {
        throw new Error('Incorrect usage of decodeAccessToken(accessToken)! accessToken must include a personUuid property in its payload');
    }
    return payload;
}

export async function verifyCredentials(email: Person['email'], password: string) {
    const user = await getPersonByEmail(email, { fullRecord: true }) as Person;
    if (!user) return false;
    const passwordsMatch = await bcrypt.compare(password, user.password_hash);
    return passwordsMatch;
}