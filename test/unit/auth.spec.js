const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const AuthController = require('../../src/app/controllers/auth');
const { jwtSecret } = require('../../src/config/config');

describe('Controllers: Auth', () => {
  describe('Generate a new token: generateToken()', () => {
    it('should return a jwt token', () => {
      const defaultUser = { id: 1, name: 'Default User', email: 'test@email.com' };
      jwt.verify(AuthController.generateToken(defaultUser), jwtSecret, (err, decoded) => {
        expect(decoded.params.id).to.be.eql(defaultUser.id);
        expect(decoded.params.email).to.be.eql(defaultUser.email);
        expect(decoded.params.name).to.be.eql(defaultUser.name);
      });
    });
  });
});
