const Sequelize = require('sequelize');
const db = require('../../config/database');

const CourseCertificates = db.define('CourseCertificates', {
  Code: {
    type: Sequelize.STRING,
    primaryKey: true,
    unique: true,
  },
  Type: {
    type: Sequelize.STRING,
  },
  Expiry: {
    type: Sequelize.DATE,
  },
  Used: {
    type: Sequelize.STRING,
  },
  Date: {
    type: Sequelize.DATE,
  },
});

module.exports = CourseCertificates;
