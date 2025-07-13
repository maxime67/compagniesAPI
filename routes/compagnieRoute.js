var express = require('express');
var compagnieRouter = express.Router();
var CompagnieController = require('../controllers/compagnieController')
compagnieRouter.get('/', CompagnieController.findAll);
compagnieRouter.get('/minimalDate/:date', CompagnieController.findByMinimalCreationDate);

module.exports = compagnieRouter;
