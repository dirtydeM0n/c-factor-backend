import * as dotenv from 'dotenv';
// DO NOT COMMIT YOUR .env FILE

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' || '.env.example' });

const config = {
    serviceName: process.env.SERVICENAME || 'node typescript postgres app',
    port: Number(process.env.PORT) || 3000,
    loggerLevel: 'debug',
    DB_URI: process.env.DB_URI || '',
    JWT_SECRET: process.env.JWT_SECRET || 'Quick brown jumps over a lazy dog!',
    db: {
        user: process.env.DB_USER || '',
        database: process.env.DB || '',
        password: process.env.DB_PASS || '',
        host: process.env.DB_HOST || '',
        port: Number(process.env.DB_PORT) || 5432,
        max: Number(process.env.DB_MAX_CLIENTS) || 20,
        idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS) || 30000
    }
};

export = config;
