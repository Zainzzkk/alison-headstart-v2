const express = require('express');
const router = express.Router();
const { uploadCourseCompletionStats } = require('../controllers/course-completion/upload-course-completion');

const routes = (app) => {
  router.post('/upload', uploadCourseCompletionStats);

  app.use('/course-completion', router);
};

module.exports = routes