const express = require('express');
const router = express.Router();
const { uploadAlisonCatalogue } = require('../controllers/alison-catalogue/upload-alison-catalogue');

const routes = (app) => {
  router.post('/upload', uploadAlisonCatalogue);

  app.use('/alison-catalogue', router);
};

module.exports = routes