const Sequelize = require('sequelize');
const db = require('../../config/database');

const CourseStatusRaw = db.define('CourseStatusRaw', {
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
  Completion: {
    type: Sequelize.INTEGER,
  },
  Time: {
    type: Sequelize.INTEGER,
  },
},
);


module.exports = CourseStatusRaw;
