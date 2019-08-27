import * as dotenv from 'dotenv';
import * as errorHandler from 'errorhandler';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' || '.env.example' });

import { Database } from './db';
import config = require('./config');

// authenticate and launch DB instance
Database
    .authenticate()
    .then(() => {
        console.log('*************************************************');
        console.log('Connection has been established successfully.');
        console.log('*************************************************');
    })
    .catch((err: any) => {
        console.log('*************************************************');
        console.error('Unable to connect to the database:', err);
        console.log('*************************************************');
    });

const app = require('./app');

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */

const server = app.listen(app.get('port'), (o) => {
    console.log('o =>', o);
    console.log(('App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
    console.log('Press CTRL-C to stop\n');
});

export = server;