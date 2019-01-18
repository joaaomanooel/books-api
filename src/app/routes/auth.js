const { authenticate } = require('../controllers/auth');

module.exports = app => app.post('/token', (req, res) => authenticate(req, res, app));
