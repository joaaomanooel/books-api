/* eslint-disable no-console */
require('dotenv').config();
const app = require('./src');

app.listen(app.get('port'), () => console.log(`app is running on port ${app.get('port')}`));
