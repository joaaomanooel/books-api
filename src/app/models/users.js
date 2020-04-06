const bcrypt = require('bcrypt');

const beforeUpdate = (user) => {
  const salt = bcrypt.genSaltSync();
  user.set('password', bcrypt.hashSync(user.password, salt));
};

const beforeCreate = (user) => {
  const salt = bcrypt.genSaltSync();
  user.set('password', bcrypt.hashSync(user.password, salt));
};

const isPassword = (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword);

module.exports = (sequelize, DataType) => sequelize.define('Users', {
  id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataType.STRING, allowNull: false, validate: { notEmpty: true } },
  email: { type: DataType.STRING, allowNull: false, unique: true, validate: { notEmpty: true } },
  password: { type: DataType.STRING, allowNull: false, validate: { notEmpty: true } },
}, { hooks: { beforeUpdate, beforeCreate }, classMethods: { isPassword } });
