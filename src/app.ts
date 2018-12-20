import * as express from 'express';
import * as compression from 'compression';  // compresses requests
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
// import * as lusca from 'lusca';
import * as dotenv from 'dotenv';
import * as mongo from 'connect-mongo';
import * as mongoose from 'mongoose';
import * as expressValidator from 'express-validator';
import * as bluebird from 'bluebird';
import * as expressJwt from 'express-jwt';
import * as swaggerUI from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';
import { SwaggerAPIRouter, RootRouter, AuthRouter, UserRouter } from './routes/index';
const cors = require('cors');

const MongoStore = mongo(session);

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' || '.env.example' });

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = process.env.MONGODB_URI;
(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoUrl, { useMongoClient: true })
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  }).catch(err => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    // process.exit();
  });

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cors(/*{
  origin: function(origin, callback) {
      const whitelist = [
        'http://127.0.0.1:3000',
      ];
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true
}*/));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    autoReconnect: true,
    mongooseConnection: mongoose.connection
  })
}));
// app.use(lusca.xframe('SAMEORIGIN'));
// app.use(lusca.xssProtection(true));
app.use(expressJwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
  requestProperty: 'auth',
  getToken: function fromHeader(req: express.Request) {
    const tokenHeader = req.headers.Authorization || req.headers.authorization;
    if (tokenHeader && (tokenHeader as string).split(' ')[0] === 'Bearer') {
      return (tokenHeader as string).split(' ')[1];
    }
  }
})
  .unless({ path: [/\/api-docs\//g, { url: '/', method: 'OPTIONS' }, /\/auth\//g] })
);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({
      msg: 'Invalid or no token supplied',
      code: 401
    });
  }
});

app.use('/', RootRouter);
app.use('/auth', AuthRouter);
app.use('/users', UserRouter);

/**
 * Add swagger endpoints
 */
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/v1', SwaggerAPIRouter);

app.use((req: express.Request, resp: express.Response) => {
  resp.status(404).send({
    msg: 'Not Found!'
  });
});

module.exports = app;