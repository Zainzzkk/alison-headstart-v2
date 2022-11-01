const Sequelize = require('sequelize');
const db = require('../../config/database');

const Users = db.define('USERS', {
  ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  USERNAME: {
    type: Sequelize.STRING,
    primaryKey: true,
    unique: true,
  },
  HASH: {
    type: Sequelize.STRING
  },
  SALT: {
    type: Sequelize.STRING
  },
  SESSION_IDENTIFY: {
    type: Sequelize.STRING
  }
},
  {
    freezeTableName: true,
  }
);

module.exports = Users;