const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

module.exports = new Sequelize(`postgres://${process.env.API_USERNAME}:${process.env.API_PASSWORD}@localhost:5432/HeadstartLearners`, {
  define: {
    timestamps: false,
  },
});
