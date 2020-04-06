const { OK, BAD_REQUEST, CREATED, UNPROCESSABLE_ENTITY, NO_CONTENT } = require('http-status');

const defaultResponse = (data, statusCode = OK) => ({ data, statusCode });
const errorResponse = (error, statusCode = BAD_REQUEST) => defaultResponse({ error }, statusCode);

class BooksController {
  constructor(Books) {
    this.Books = Books;
  }

  getAll() {
    return this.Books.findAll({})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.Books.findOne({ where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data) {
    return this.Books.create(data)
      .then(result => defaultResponse(result, CREATED))
      .catch(error => errorResponse(error.message, UNPROCESSABLE_ENTITY));
  }

  update(data, params) {
    return this.Books.update(data, { where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.Books.destroy({ where: params })
      .then(result => defaultResponse(result, NO_CONTENT))
      .catch(error => errorResponse(error.message, UNPROCESSABLE_ENTITY));
  }
}

module.exports = BooksController;
