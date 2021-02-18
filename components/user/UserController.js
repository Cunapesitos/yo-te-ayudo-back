'use strict'

var Validator = require('Validator');
var User = require('./UserModel');
var Controller = require('../base/Controller')

class UserController extends Controller {

    create = (req, res) => {
        const request = req.body;
        let user = new User(request);
        user.save();
        return this.send(res, 200, "User registered", user);
    }

    readAll = (req, res) => {

    }

    readOne = (req, res) => {

    }

    update = (req, res) => {

    }

    delete = (req, res) => {

    }
}

module.exports = UserController;