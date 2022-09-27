const express = require('express');
const router = express.Router();
const { uploadCourseCodes } = require('../controllers/course-codes/upload-course-codes');
const { getCertificateCodes } = require('../controllers/course-codes/get-course-codes');

const routes = (app) => {
  router.post('/upload', uploadCourseCodes);
  router.get('/codes', getCertificateCodes);

  app.use('/course-codes', router);
};

module.exports = routes