const Sequelize = require('sequelize');
const db = require('../../config/database');

const DiplomaCertificate = db.define('DiplomaCertificate', {
  Code: {
    type: Sequelize.STRING,
    primaryKey: true,
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

module.exports = DiplomaCertificate;
