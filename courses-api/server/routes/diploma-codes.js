const express = require('express');
const router = express.Router();
const { uploadDiplomaCodes } = require('../controllers/diploma-codes/upload-diploma-codes');
const { getDiplomaCodes } = require('../controllers/diploma-codes/get-diploma-codes');

const routes = (app) => {
  router.post('/upload', uploadDiplomaCodes);
  router.get('/codes', getDiplomaCodes);

  app.use('/diploma-codes', router);
};

module.exports = routes