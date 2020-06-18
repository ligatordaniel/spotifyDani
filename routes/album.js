'use strict'

const express = require('express');
const ArtistController = require('../controllers/album');

const api = express.Router();
const md_auth = require ('../middlewares/authenticated');

const multipart = require('connect-multiparty'); /*necesario para img subidas artista*/
const md_upload = multipart({ uploadDir: './uploads/artists'});

api.get('/album', md_auth.ensureAuth, ArtistController.getAlbum);


module.exports = api;