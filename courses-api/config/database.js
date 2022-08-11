const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

module.exports = new Sequelize(`postgres://${process.env.API_USERNAME}:${process.env.API_PASSWORD}@127.0.0.1:5434/HeadstartTest2`, {
  define: {
    timestamps: false,
  },
});
