const express = require('express');
const router = express.Router();
const { uploadCourseCodes } = require('../controllers/course-codes/upload-course-codes');
const { getCertificateCodes, getUnusedCertificateCodes } = require('../controllers/course-codes/get-course-codes');
const { allocateCourseCode } = require('../controllers/course-codes/allocate-course-code');
const { unallocateCertificate } = require('../controllers/course-codes/unallocate-certificate-code');

const routes = (app) => {
  router.post('/upload', uploadCourseCodes);
  router.get('/codes', getCertificateCodes);
  router.get('/unused-codes', getUnusedCertificateCodes);
  router.post('/allocate', allocateCourseCode);
  router.delete('/unallocate', unallocateCertificate);

  app.use('/course-codes', router);
};

module.exports = routes