import * as dotenv from 'dotenv';
// DO NOT COMMIT YOUR .env FILE

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' || '.env.example' });

const config = {
    serviceName: process.env.SERVICENAME || 'node typescript postgres app',
    loggerLevel: 'debug',
    PORT: Number(process.env.PORT) || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URI: process.env.DB_URI || '',
    SESSION_SECRET: process.env.SESSION_SECRET || '',
    JWT_SECRET: process.env.JWT_SECRET || 'Quick brown jumps over a lazy dog!',
    db: {
        user: process.env.DB_USER || '',
        database: process.env.DB || '',
        password: process.env.DB_PASS || '',
        host: process.env.DB_HOST || '',
        port: Number(process.env.DB_PORT) || 5432,
        max: Number(process.env.DB_MAX_CLIENTS) || 20,
        idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS) || 30000
    },
    mail: {
        SMTP_HOST: process.env.SMTP_HOST || '',
        SMTP_PORT: process.env.SMTP_PORT || '',
        SMTP_USER: process.env.SMTP_USER || '',
        SMTP_PASSWORD: process.env.SMTP_PASSWORD || '',
        SMTP_LOGGER: process.env.SMTP_LOGGER || true,
        SMTP_TIMEOUT: process.env.SMTP_TIMEOUT || 5000
    }
};

export = config;
