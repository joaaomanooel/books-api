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
  jwtSecret: 'Secr3t',
  jwtSession: { session: false },
};
