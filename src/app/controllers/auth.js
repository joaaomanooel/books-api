const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { BAD_REQUEST } = require('http-status');
const { jwtSecret } = require('../../config/config');

const generateToken = (params = {}) => jwt.sign({ params }, jwtSecret, { expiresIn: 86400 });

const authenticate = async (req, res, app) => {
  const { Users } = app.datasource.models;
  const { email, password } = req.body;
  if (!email || !password) return res.status(BAD_REQUEST).send({ error: 'User not found.' });
  const user = await Users.findOne({ where: { email } });
  if (!user) return res.status(BAD_REQUEST).send({ error: 'User not found.' });
  if (!await bcrypt.compare(password, user.password)) {
    return res.status(BAD_REQUEST).send({ error: 'Invalid password.' });
  }

  user.password = undefined;

  return res.send({ user, token: generateToken({ id: user._id }) });
};

module.exports = { authenticate, generateToken };
