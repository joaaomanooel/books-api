/* eslint-disable no-unused-expressions */
const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../../src');

const request = supertest(app);

describe('Routes Auth', () => {
  const { Users } = app.datasource.models;
  const defaultUser = {
    id: 1,
    name: 'Default User',
    email: 'test@email.com',
    password: 'test',
  };

  before(() => Users.findAll());

  beforeEach((done) => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create(defaultUser))
      .then(() => {
        done();
      });
  });

  describe('Route POST /token', () => {
    it('should return a authenticated user', (done) => {
      request
        .post('/token')
        .send(defaultUser)
        .end((err, res) => {
          expect(res.body.user.id).to.be.eql(defaultUser.id);
          expect(res.body.user.name).to.be.eql(defaultUser.name);
          expect(res.body.user.email).to.be.eql(defaultUser.email);
          expect(typeof res.body.token === 'string').to.be.true;

          done(err);
        });
    });

    it('should return an error when the password is wrong', (done) => {
      request.post('/token')
        .send({ ...defaultUser, password: '1234' })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.body.error).to.be.eql('Invalid password.');

          done(err);
        });
    });

    it('should return an error when the email is wrong', (done) => {
      request.post('/token')
        .send({ ...defaultUser, email: 'a@b.com' })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.body.error).to.be.eql('User not found.');

          done(err);
        });
    });

    it('should return an error when dont send email', (done) => {
      request.post('/token')
        .send({ ...defaultUser, email: undefined })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.body.error).to.be.eql('User not found.');

          done(err);
        });
    });

    it('should return an error when dont send password', (done) => {
      request.post('/token')
        .send({ ...defaultUser, password: undefined })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.body.error).to.be.eql('User not found.');

          done(err);
        });
    });
  });
});
