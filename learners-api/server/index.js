const express = require("express");

const learnersRoutes = require('./routes');
const sequelize = require('../config/database');

const PORT = process.env.PORT || 3002;

const app = express();

sequelize.authenticate()
  .then(() => console.log('Learners Database connected...'))
  .catch((err) => console.log(err));

app.use(express.json({ limit: '100mb' }))

app.use(express.urlencoded({ extended: true }));
learnersRoutes(app);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});