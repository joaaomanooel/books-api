/* eslint-disable no-console */
const app = require('./src');

app.listen(app.get('port'), () => console.log(`app is running on port ${app.get('port')}`));
