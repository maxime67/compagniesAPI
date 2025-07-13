var express = require('express');
var compagnieRouter = express.Router();
var CompagnieController = require('../controllers/compagnieController')
compagnieRouter.get('/', CompagnieController.findAll);
compagnieRouter.get('/export/minimalDate', CompagnieController.exportByMinimalCreationDate);

module.exports = compagnieRouter;
