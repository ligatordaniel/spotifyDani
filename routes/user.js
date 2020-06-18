'use strict'

const express = require('express');
const UserController = require('../controllers/user');

const api = express.Router();
const md_auth = require('../middlewares/authenticated'); /*nos permite usar md_auth.ensureAuth*/

const multipart = require('connect-multiparty'); /*necesario para img subidas perfil*/
const md_upload = multipart({ uploadDir: './uploads/users'});

api.get('/probando-controlador',md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id',[md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);

module.exports = api;

/*http://localhost:3977/api/probando-controlador     */
/*http://localhost:3977/api/register    */
/*http://localhost:3977/api/login    */
/*http://localhost:3977/api/get-image-user/qftc_RB_O0jYECw9fiHbtrkr.jpg    */