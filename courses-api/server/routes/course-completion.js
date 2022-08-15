const express = require('express');
const router = express.Router();
const { uploadCourseCompletionStats, uploadCourseCompletionStatsManual } = require('../controllers/course-completion/upload-course-completion');

const routes = (app) => {
  router.post('/upload', uploadCourseCompletionStats);
  router.post('/upload-manual', uploadCourseCompletionStatsManual);

  app.use('/course-completion', router);
};

module.exports = routes