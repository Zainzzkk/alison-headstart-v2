const Sequelize = require('sequelize');
const db = require('../../config/database');

const JamatkhanaTracker = db.define('JamatkhanaTracker', {
  'ID': {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  'Date': {
    type: Sequelize.STRING,
  },
  'amsterdam': {
    type: Sequelize.INTEGER,
  },
  'badsalzuflen': {
    type: Sequelize.INTEGER,
  },
  'berlin': {
    type: Sequelize.INTEGER,
  },
  'birmingham': {
    type: Sequelize.INTEGER,
  },
  'bosel': {
    type: Sequelize.INTEGER,
  },
  'brighton': {
    type: Sequelize.INTEGER,
  },
  'bristol': {
    type: Sequelize.INTEGER,
  },
  'cambridge': {
    type: Sequelize.INTEGER,
  },
  'cardiff': {
    type: Sequelize.INTEGER,
  },
  'copenhagen': {
    type: Sequelize.INTEGER,
  },
  'coventry': {
    type: Sequelize.INTEGER,
  },
  'darkhana': {
    type: Sequelize.INTEGER,
  },
  'dresden': {
    type: Sequelize.INTEGER,
  },
  'dublin': {
    type: Sequelize.INTEGER,
  },
  'eastlondon': {
    type: Sequelize.INTEGER,
  },
  'eastbourne/hastings': {
    type: Sequelize.INTEGER,
  },
  'edinburgh': {
    type: Sequelize.INTEGER,
  },
  'erfut': {
    type: Sequelize.INTEGER,
  },
  'essen': {
    type: Sequelize.INTEGER,
  },
  'finland': {
    type: Sequelize.INTEGER,
  },
  'frankfurt': {
    type: Sequelize.INTEGER,
  },
  'freiburg': {
    type: Sequelize.INTEGER,
  },
  'glasgow': {
    type: Sequelize.INTEGER,
  },
  'gloucester': {
    type: Sequelize.INTEGER,
  },
  'gothenburg': {
    type: Sequelize.INTEGER,
  },
  'graz': {
    type: Sequelize.INTEGER,
  },
  'greece': {
    type: Sequelize.INTEGER,
  },
  'guildford': {
    type: Sequelize.INTEGER,
  },
  'hamburg': {
    type: Sequelize.INTEGER,
  },
  'hatfield': {
    type: Sequelize.INTEGER,
  },
  'innsbruck': {
    type: Sequelize.INTEGER,
  },
  'italy': {
    type: Sequelize.INTEGER,
  },
  'leeds/bradford': {
    type: Sequelize.INTEGER,
  },
  'leicester': {
    type: Sequelize.INTEGER,
  },
  'leipzig': {
    type: Sequelize.INTEGER,
  },
  'linz': {
    type: Sequelize.INTEGER,
  },
  'ljungby': {
    type: Sequelize.INTEGER,
  },
  'malmo': {
    type: Sequelize.INTEGER,
  },
  'manchester': {
    type: Sequelize.INTEGER,
  },
  'mariestad': {
    type: Sequelize.INTEGER,
  },
  'miltonkeynes': {
    type: Sequelize.INTEGER,
  },
  'motala': {
    type: Sequelize.INTEGER,
  },
  'munich': {
    type: Sequelize.INTEGER,
  },
  'newcastle': {
    type: Sequelize.INTEGER,
  },
  'northlondon': {
    type: Sequelize.INTEGER,
  },
  'northampton': {
    type: Sequelize.INTEGER,
  },
  'northwest': {
    type: Sequelize.INTEGER,
  },
  'nottingham': {
    type: Sequelize.INTEGER,
  },
  'oldenburg': {
    type: Sequelize.INTEGER,
  },
  'oslo': {
    type: Sequelize.INTEGER,
  },
  'oxford': {
    type: Sequelize.INTEGER,
  },
  'peterborough': {
    type: Sequelize.INTEGER,
  },
  'poland': {
    type: Sequelize.INTEGER,
  },
  'reading': {
    type: Sequelize.INTEGER,
  },
  'rotterdam': {
    type: Sequelize.INTEGER,
  },
  'salzburg': {
    type: Sequelize.INTEGER,
  },
  'schweinfurt': {
    type: Sequelize.INTEGER,
  },
  'sheffield': {
    type: Sequelize.INTEGER,
  },
  'southeastlondon': {
    type: Sequelize.INTEGER,
  },
  'southlondon': {
    type: Sequelize.INTEGER,
  },
  'southwestlondon': {
    type: Sequelize.INTEGER,
  },
  'stockholm': {
    type: Sequelize.INTEGER,
  },
  'swindon': {
    type: Sequelize.INTEGER,
  },
  'vanersborg': {
    type: Sequelize.INTEGER,
  },
  'vienna': {
    type: Sequelize.INTEGER,
  },
  'westlondon': {
    type: Sequelize.INTEGER,
  },
  'wuppertal': {
    type: Sequelize.INTEGER,
  },
  'zevenaar': {
    type: Sequelize.INTEGER,
  },
  'stokeontrent': {
    type: Sequelize.INTEGER,
  },
});

module.exports = JamatkhanaTracker;
