const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

module.exports = new Sequelize(`postgres://${process.env.API_USERNAME}:${process.env.API_PASSWORD}@0.0.0.0:5434/HeadstartTest2`, {
  define: {
    timestamps: false,
  },
});
