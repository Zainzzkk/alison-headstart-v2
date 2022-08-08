const Sequelize = require('sequelize');
const db = require('../../config/database');

const Course = db.define('Course', {
  ID: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
  },
  Name: {
    type: Sequelize.STRING,
  },
  Type: {
    type: Sequelize.STRING,
  },
  Category: {
    type: Sequelize.STRING,
  },
});

module.exports = Course;
