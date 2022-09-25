const express = require('express');
const router = express.Router();
const { uploadCourseCompletionStats, uploadCourseCompletionStatsManual } = require('../controllers/course-completion/upload-course-completion');
const { getCourseCompletionRaw, getCourseCompletion } = require('../controllers/course-completion/get-course-completion');

const routes = (app) => {
  router.post('/upload', uploadCourseCompletionStats);
  router.post('/upload-manual', uploadCourseCompletionStatsManual);
  router.get('/raw', getCourseCompletionRaw);
  router.get('/filtered', getCourseCompletion);
  app.use('/course-completion', router);
};

module.exports = routes