const Sequelize = require('sequelize');
const db = require('../../config/database');

const LearnerDetails = db.define('LearnerDetails', {
  ID: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
  },
  Name: {
    type: Sequelize.STRING,
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
  Email: {
    type: Sequelize.STRING,
  },
});

module.exports = LearnerDetails;
