'use strict'
const express = require('express');
const userController = require('../controllers/user');

const api = express.Router();
const md_auth = require('../middlewares/authenticated'); /*nos permite usar md_auth.ensureAuth*/

api.get('/probando-controlador',md_auth.ensureAuth, userController.pruebas);
api.post('/register', userController.saveUser);
api.post('/login', userController.loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, userController.updateUser);

module.exports = api;


/*http://localhost:3977/api/probando-controlador*/
/*http://localhost:3977/api/register*/
/*http://localhost:3977/api/login*/