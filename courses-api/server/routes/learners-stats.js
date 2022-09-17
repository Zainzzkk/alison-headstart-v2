const express = require('express');
const router = express.Router();
const { uploadLearnersStats } = require('../controllers/learners-stats/upload-learners-stats');
const { getAllLearners } = require('../controllers/learners-stats/get-all-learners');
const { getAllLearnersGender } = require('../controllers/learners-stats/get-all-learners-gender');

const routes = (app) => {
  router.post('/upload', uploadLearnersStats);
  router.get('/get-learners', getAllLearners);
  router.get('/get-learners-gender', getAllLearnersGender);

  app.use('/learners-stats', router);
};

module.exports = routes