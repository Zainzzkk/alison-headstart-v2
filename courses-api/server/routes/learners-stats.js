const express = require('express');
const router = express.Router();
const { uploadLearnersStats } = require('../controllers/learners-stats/upload-learners-stats');

const routes = (app) => {
  router.post('/upload', uploadLearnersStats);

  app.use('/learners-stats', router);
};

module.exports = routes