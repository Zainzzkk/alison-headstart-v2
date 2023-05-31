const express = require('express');
const router = express.Router();
const { uploadCourseCompletionStats, uploadCourseCompletionStatsManual } = require('../controllers/course-completion/upload-course-completion');
const { getCourseCompletionRaw, getCourseCompletion } = require('../controllers/course-completion/get-course-completion');
const { getCompletionCertificateTracker } = require('../controllers/course-completion/get-course-certificate-tracker');
const { uploadCourseCertificateTracker, uploadCourseCertificateTrackerManual, allocateCourseCertificateTracker } = require('../controllers/course-completion/upload-course-certificate-tracker');
const { checkForCompletion } = require('../controllers/course-completion/check-for-completion');
const { unallocateCertificateTracker } = require('../controllers/course-completion/unallocate-certificate-tracker');
const { deleteSpecificRaw, deleteSpecificFiltered } = require('../controllers/course-completion/delete-course-completion');
const { getTopCourses } = require('../controllers/course-completion/get-top-courses');

const routes = (app) => {
  router.post('/upload', uploadCourseCompletionStats);
  router.post('/upload-manual', uploadCourseCompletionStatsManual);
  router.post('/upload-tracker', uploadCourseCertificateTracker);
  router.post('/upload-tracker/manual', uploadCourseCertificateTrackerManual);
  router.get('/raw', getCourseCompletionRaw);
  router.get('/filtered', getCourseCompletion);
  router.get('/course-certificate-tracker', getCompletionCertificateTracker);
  router.post('/check-for-completion', checkForCompletion);
  router.post('/allocate', allocateCourseCertificateTracker);
  router.delete('/unallocate', unallocateCertificateTracker);
  router.delete('/delete-raw', deleteSpecificRaw);
  router.delete('/delete-filtered', deleteSpecificFiltered);
  router.get('/top-courses', getTopCourses);
  app.use('/course-completion', router);
};

module.exports = routes