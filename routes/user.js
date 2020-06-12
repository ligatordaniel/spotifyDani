'use strict'
const express = require('express');
const userController = require('../controllers/user');

const api = express.Router();
const md_auth = require('../middlewares/authenticated');

api.get('/probando-controlador',md_auth.ensureAuth, userController.pruebas);
api.post('/register', userController.saveUser);
api.post('/login', userController.loginUser);

module.exports = api;


/*http://localhost:3977/api/probando-controlador*/
/*http://localhost:3977/api/register*/
/*http://localhost:3977/api/login*/