describe('Routes Books', () => {
  const defaultBooks = {
    id: 1,
    name: 'Default Book'
  };

  describe('Route GET /books', () => {
    it('should return a list of books', (done) => {
      request
        .get('/books')
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultBooks.id);
          expect(res.body[0].nome).to.be.eql(defaultBooks.name);

          done(err);
        });
    });
  });
});
