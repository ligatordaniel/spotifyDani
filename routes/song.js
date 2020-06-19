'use strict'

const express = require('express');
const SongController = require('../controllers/song');

const api = express.Router();
const md_auth = require ('../middlewares/authenticated');

const multipart = require('connect-multiparty'); /*necesario para img subidas artista*/
const md_upload = multipart({ uploadDir: './uploads/song'});

api.get('/song', md_auth.ensureAuth, SongController.getSong);


module.exports = api;