const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 5000);
app.config = require('./config/config');
app.datasource = require('./config/datasource')(app);
require('./app/routes/index')(app);

app.use('/', (_req, res) => res.send({ message: 'Bem vindo a Books API!' }));

module.exports = app;
