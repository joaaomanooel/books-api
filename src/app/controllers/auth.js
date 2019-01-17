const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status');
const authConfig = require('../../config/config');

function generateToken(params = {}) {
  return jwt.sign(
    { params },
    authConfig.jwtSecret,
    { expiresIn: 86400 }
  );
}

module.exports = async (req, res, app) => {
  const { Users } = app.datasource.models;
  const { email, password } = req.body;
  if(!email || !password) return res.status(HttpStatus.BAD_REQUEST).send({ error: 'User not found.' });
  const user = await Users.findOne({ where: { email } });
  if (!user) return res.status(HttpStatus.BAD_REQUEST).send({ error: 'User not found.' });
  if (!await bcrypt.compare(password, user.password)) {
    return res.status(HttpStatus.BAD_REQUEST).send({ error: 'Invalid password.' });
  }

  user.password = undefined;

  return res.send({
    user,
    token: generateToken({ id: user._id }),
  });
};
