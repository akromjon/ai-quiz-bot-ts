import dotenv from 'dotenv';

dotenv.config();

const loadEnv = <T extends string | number | null>(key: string, defaultValue: T): T => {
    const value = process.env[key];

    if (value === undefined) {
        return defaultValue;
    }

    const numValue = Number(value);

    if (!isNaN(numValue)) {
        return numValue as T;
    }

    return value as T;
};


const CONFIG = {
    APP_URL: loadEnv('APP_URL', 'localhost'),
    APP_PORT: loadEnv('APP_PORT', 8000),
    APP_ENV: loadEnv('APP_ENV', 'dev'),
    OPENAI_API_KEY: loadEnv('OPENAI_API_KEY', ""),

};

export {CONFIG,loadEnv};
