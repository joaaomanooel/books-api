module.exports = {
  database: 'books',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: `${process.env.NODE_ENV || 'prod'}_books.sqlite`,
    define: {
      undercored: true,
    },
  },
  jwtSecret: '63028de2d2e2e2cc97748dbe0c32b3e5',
};
