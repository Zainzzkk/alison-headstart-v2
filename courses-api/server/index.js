const express = require("express");

const courseCodeRoutes = require('./routes/courses-codes');
const diplomaCodeRoutes = require('./routes/diploma-codes');
const alisonCatalogueRoutes = require('./routes/alison-catalogue');
const learnersStats = require('./routes/learners-stats');
const sequelize = require('../config/database');


const PORT = process.env.PORT || 3001;

const app = express();

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log(err));

app.use(express.json({ limit: '100mb' }))

app.use(express.urlencoded({ extended: true }));
courseCodeRoutes(app);
diplomaCodeRoutes(app);
alisonCatalogueRoutes(app);
learnersStats(app);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});