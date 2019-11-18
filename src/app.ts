import * as express from 'express';
import * as compression from 'compression';  // compresses requests
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
// import * as lusca from 'lusca';
import * as expressValidator from 'express-validator';
import * as expressJwt from 'express-jwt';
import * as swaggerUI from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';
const cors = require('cors');
const flash = require('connect-flash');
const passport = require('passport');
import config = require('./config');
import {
  SwaggerAPIRouter,
  RootRouter,
  AuthRouter,
  UserRouter,
  RoleRouter,
  AvatarRouter,
  DepartmentRouter,
  CompanyRouter,
  ClientRouter,
  CampaignRouter,
  CampaignInviteRouter,
  CompetencyRouter,
  CompetencyDataRouter,
  QueryRouter
} from './routes/index';
import { ValidateToken } from './routes/middleware/validate_token';
import { validateRoles, validateRole } from './routes/middleware/validate_role';

// Create Express server
const app = express();

// Express configuration
app.set('port', config.PORT);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(compression());
app.use(logger('dev'));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cors(/*{
  origin: function(origin, callback) {
      const whitelist = [
        'http://127.0.0.1:3000',
      ];
      if (whitelist.indexOf(origin) !== -1) { // present
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}*/));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.SESSION_SECRET
}));

// app.use(lusca.xframe('SAMEORIGIN'));
// app.use(lusca.xssProtection(true));

app.use(expressJwt({
  secret: config.JWT_SECRET,
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

app.use(function (err, req, resp, next) {
  if (err.name === 'UnauthorizedError') {
    resp.status(401).send({
      msg: 'Invalid or no token supplied'
    });
  }
});

app.use('/', RootRouter);
app.use('/auth', AuthRouter);
app.use('/users', ValidateToken, validateRoles(['applicant', 'admin', 'client']), UserRouter);
app.use('/clients', ValidateToken, validateRoles(['admin']), ClientRouter);
app.use('/roles', ValidateToken, validateRole('admin'), RoleRouter);
app.use('/departments', ValidateToken, validateRoles(['client']), DepartmentRouter);
app.use('/companies', ValidateToken, validateRoles(['client']), CompanyRouter);
app.use('/avatars', ValidateToken, validateRoles(['applicant', 'admin', 'client']), AvatarRouter);
app.use('/campaigns', ValidateToken, validateRoles(['admin', 'client']), CampaignRouter);
app.use('/campaignInvites', ValidateToken, validateRoles(['admin', 'client']), CampaignInviteRouter);
app.use('/competencies', ValidateToken, validateRoles(['admin', 'client']), CompetencyRouter);
app.use('/competencyData', CompetencyDataRouter);
app.use('/execute', ValidateToken, validateRoles(['admin']), QueryRouter);

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