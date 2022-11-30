
import { getEnvVariableValue } from '@/utils/general.utils';
import knex from 'knex';

const DB_HOST_DOMAIN = getEnvVariableValue('DB_HOST_DOMAIN');
const DB_HOST_PORT = parseInt(getEnvVariableValue('DB_HOST_PORT'));
const DB_USER = getEnvVariableValue('DB_USER');
const DB_PASSWORD = getEnvVariableValue('DB_PASSWORD');
const DB_NAME = getEnvVariableValue('DB_NAME');

export const dbClient = knex({
    client: 'mysql',
    connection: {
        host: DB_HOST_DOMAIN,
        port: DB_HOST_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME
    }
});
