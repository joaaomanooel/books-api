const authController = require('../controllers/auth');

module.exports = app => app.post('/token', (req, res) => authController(req, res, app));
