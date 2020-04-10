const defaultValue = 'books';

module.exports = {
  database: process.env.DB_DATABASE || defaultValue,
  username: process.env.DB_USERNAME || defaultValue,
  password: process.env.DB_PASSWORD || defaultValue,
  params: {
    dialect: 'sqlite',
    operatorsAliases: 0,
    storage: `${process.env.NODE_ENV || 'prod'}_books.sqlite`,
    define: { undercored: true },
  },
  jwtSecret: process.env.JWT_SECRET || defaultValue,
};
