const Sequelize = require('sequelize');
const db = require('../../config/database');

const Learners = db.define('Learner', {
  ID: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
  },
  AgeBand: {
    type: Sequelize.STRING,
  },
  Gender: {
    type: Sequelize.STRING,
  },
  Jamatkhana: {
    type: Sequelize.STRING,
  },
  TotalDuration: {
    type: Sequelize.INTEGER,
  },
  NumberCourses: {
    type: Sequelize.STRING,
  },
});

module.exports = Learners;
