const Sequelize = require('sequelize');
const db = require('../../config/database');

const GenderTracker = db.define('GenderTracker', {
  ID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Date: {
    type: Sequelize.STRING,
  },
  Male: {
    type: Sequelize.INTEGER,
  },
  Female: {
    type: Sequelize.INTEGER,
  },
});

module.exports = GenderTracker;
