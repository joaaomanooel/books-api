const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const readme = require('readmeio');

const app = express();
if (process.env.NODE_ENV !== 'test') {
  app.use(readme.metrics(process.env.READEME_TOKEN, req => ({
    id: req.userId,
    label: req.userName,
    email: req.userEmail,
  }), { development: process.env.NODE_ENV === 'development' }));
}
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
