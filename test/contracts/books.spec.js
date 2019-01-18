const Joi = require('joi');
const joiAssert = require('joi-assert');
const { generateToken } = require('../../src/app/controllers/auth');

describe('Routes Books', () => {
  const { Books } = app.datasource.models;
  const { Users } = app.datasource.models;
  const { jwtSecret } = app.config;

  const defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'Default Description',
  };

  let token;

  before(() => Books.find());

  beforeEach((done) => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create({
        name: 'João',
        email: 'joao@mail.com',
        password: '12345',
      }))
      .then((user) => {
        Books
          .destroy({ where: {} })
          .then(() => Books.create(defaultBook))
          .then(() => {
            token = generateToken({ id: user.id }, jwtSecret);
            done();
          });
      });
  });

  describe('Route GET /books', () => {
    it('should return a list of books', (done) => {
      const booksList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      }));

      request
        .get('/books')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          joiAssert(res.body, booksList);
          done(err);
        });
    });
  });

  describe('Route GET /books/{id}', () => {
    it('should return a books', (done) => {
      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      });

      request
        .get('/books/1')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          joiAssert(res.body, book);
          done(err);
        });
    });
  });

  describe('Route POST /books', () => {
    it('should create a book', (done) => {
      const newBook = {
        id: 2,
        name: 'new book',
        description: 'new Description',
      };

      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      });

      request
        .post('/books')
        .send(newBook)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          joiAssert(res.body, book);
          done(err);
        });
    });
  });

  describe('Route PUT /books/{id}', () => {
    it('should update a book', (done) => {
      const updatedBook = {
        id: 1,
        name: 'updated book',
        description: 'updated Description',
      };

      const updatedCount = Joi.array().items(1);

      request
        .put('/books/1')
        .send(updatedBook)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          joiAssert(res.body, updatedCount);
          done(err);
        });
    });
  });

  describe('Route DELETE /books/{id}', () => {
    it('should delete a book', (done) => {
      request
        .delete('/books/1')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
