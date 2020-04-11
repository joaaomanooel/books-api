/* eslint-disable no-console */
require('dotenv').config();
const readme = require('readmeio');
const app = require('./src');

if (process.env.NODE_ENV !== 'test') {
  app.use(readme.metrics(process.env.READEME_TOKEN, req => ({
    id: req.userId,
    label: req.userName,
    email: req.userEmail,
  }), { development: process.env.NODE_ENV === 'development' }));
}

app.listen(app.get('port'), () => console.log(`app is running on port ${app.get('port')}`));
