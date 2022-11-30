
export function getEnvVariableValue(key: string) {
    if (!process.env[key]) throw new Error(`${key} does not exist in .env`);
    return process.env[key] as string;
}

export function structuredClone<T>(obj: T) {
    return JSON.parse(JSON.stringify(obj)) as T;
}