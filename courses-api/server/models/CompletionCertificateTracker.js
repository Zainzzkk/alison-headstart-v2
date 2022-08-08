const Sequelize = require('sequelize');
const db = require('../../config/database');

const CompletionCertificateTracker = db.define('CompletionCertificateTracker', {
  LearnerID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  CourseID: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  CourseName: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  Type: {
    type: Sequelize.STRING,
  },
  Completion: {
    type: Sequelize.INTEGER,
  },
  Time: {
    type: Sequelize.INTEGER,
  },
  Status: {
    type: Sequelize.STRING,
  },
  Code: {
    type: Sequelize.STRING,
  },
});

module.exports = CompletionCertificateTracker;
