const { OK, BAD_REQUEST, CREATED, UNPROCESSABLE_ENTITY, NO_CONTENT } = require('http-status');
const { generateToken } = require('./auth');

const defaultResponse = (data, statusCode = OK) => ({ data, statusCode });
const errorResponse = (error, statusCode = BAD_REQUEST) => defaultResponse({ error }, statusCode);

class UsersController {
  constructor(Users) {
    this.Users = Users;
  }

  getAll() {
    return this.Users.findAll({})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.Users.findOne({ where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data) {
    return this.Users.create(data)
      .then((result) => {
        const token = generateToken({ id: result.id });
        result.password = undefined; // eslint-disable-line no-param-reassign
        return defaultResponse({ user: result, token }, CREATED);
      })
      .catch(error => errorResponse(error.message, UNPROCESSABLE_ENTITY));
  }

  update(data, params) {
    return this.Users.update(data, { where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.Users.destroy({ where: params })
      .then(result => defaultResponse(result, NO_CONTENT))
      .catch(error => errorResponse(error.message, UNPROCESSABLE_ENTITY));
  }
}

module.exports = UsersController;
