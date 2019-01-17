const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('../config/config');
const datasource = require('../config/datasource');
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const authorization = require('./auth');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.config = config;
app.datasource = datasource(app);
app.set('port', process.env.PORT || 5000);

const auth = authorization(app);
app.use(auth.initialize());
app.auth = auth;

booksRouter(app);
usersRouter(app);
authRouter(app);

module.exports = app;
