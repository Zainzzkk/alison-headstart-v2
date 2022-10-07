const express = require('express');
const router = express.Router();
const { uploadLearners, uploadLearnersManual } = require('./controllers/upload-learners');
const { getLearner } = require('./controllers/get-learners')

const routes = (app) => {
  router.post('/upload', uploadLearners);
  router.post('/upload-manual', uploadLearnersManual);
  router.get('/learner/:learnerId', getLearner);

  app.use('/learners-data', router);
};

module.exports = routes