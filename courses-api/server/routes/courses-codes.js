const express = require('express');
const router = express.Router();
const { uploadCourseCodes } = require('../controllers/course-codes/upload-course-codes');

const routes = (app) => {
  router.post('/upload', uploadCourseCodes);

  app.use('/course-codes', router);
};

module.exports = routes