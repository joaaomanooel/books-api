const BooksController = require('../controllers/books');
const authMiddleware = require('../middleware/auth');

const booksRouter = (app) => {
  const { Books } = app.datasource.models;
  const booksController = new BooksController(Books);
  app.route('/books')
    .all(authMiddleware)
    .get((req, res) => {
      booksController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      booksController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/books/:id')
    .all(authMiddleware)
    .get((req, res) => {
      booksController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      booksController.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      booksController.delete(req.params)
        .then(response => res.sendStatus(response.statusCode));
    });
};

module.exports = booksRouter;
