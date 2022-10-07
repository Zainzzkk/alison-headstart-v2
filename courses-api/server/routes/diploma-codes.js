const express = require('express');
const router = express.Router();
const { uploadDiplomaCodes } = require('../controllers/diploma-codes/upload-diploma-codes');
const { getDiplomaCodes, getUnusedDiplomaCodes } = require('../controllers/diploma-codes/get-diploma-codes');
const { allocateDiplomaCode } = require('../controllers/diploma-codes/allocate-diploma-code');
const { unallocateDiploma } = require('../controllers/diploma-codes/unallocate-diploma-code');

const routes = (app) => {
  router.post('/upload', uploadDiplomaCodes);
  router.get('/codes', getDiplomaCodes);
  router.get('/unused-codes', getUnusedDiplomaCodes);
  router.post('/allocate', allocateDiplomaCode);
  router.delete('/unallocate', unallocateDiploma);

  app.use('/diploma-codes', router);
};

module.exports = routes