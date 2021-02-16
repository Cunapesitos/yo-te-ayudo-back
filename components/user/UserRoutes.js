'use strict'

var express = require('express');
var UserController = require('./UserController');

var userController = new UserController();
var router = express.Router();

router.post('/user', userController.create);
router.get('/users', userController.readAll);
router.get('/user/:id', userController.readOne);
router.put('/user/:id', userController.update);
router.delete('/user/:id', userController.delete);

module.exports = router;