const express = require('express');
const router = express.Router();
const { uploadDiplomaCodes } = require('../controllers/diploma-codes/upload-diploma-codes');

const routes = (app) => {
  router.post('/upload', uploadDiplomaCodes);

  app.use('/diploma-codes', router);
};

module.exports = routes