const { UNAUTHORIZED } = require('http-status');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) return res.status(UNAUTHORIZED).send({ error: 'No token provided' });

  const parts = authHeaders.split(' ');

  if (!parts.length === 2) return res.status(UNAUTHORIZED).send({ error: 'Token error' });

  const [scheme, token] = parts;
  const hasBearer = !/^Bearer$/i.test(scheme);

  if (hasBearer) return res.status(UNAUTHORIZED).send({ error: 'Token malformated' });

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) return res.status(UNAUTHORIZED).send({ error: 'Token invalid' });
    req.userId = decoded.params.id;

    return next();
  });
};
