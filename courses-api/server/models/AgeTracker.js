const Sequelize = require('sequelize');
const db = require('../../config/database');

const AgeTracker = db.define('AgeTracker', {
  ID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Date: {
    type: Sequelize.STRING,
  },
  Under18: {
    type: Sequelize.INTEGER,
  },
  ages1825: {
    type: Sequelize.INTEGER,
  },
  ages2635: {
    type: Sequelize.INTEGER,
  },
  ages3645: {
    type: Sequelize.INTEGER,
  },
  ages4655: {
    type: Sequelize.INTEGER,
  },
  ages5660: {
    type: Sequelize.INTEGER,
  },
  ages6165: {
    type: Sequelize.INTEGER,
  },
  Above65: {
    type: Sequelize.INTEGER,
  },
});

module.exports = AgeTracker;
