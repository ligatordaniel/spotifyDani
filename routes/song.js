'use strict'

const express = require('express');
const SongController = require('../controllers/song');

const api = express.Router();
const md_auth = require ('../middlewares/authenticated');

const multipart = require('connect-multiparty'); /*necesario para img subidas song*/
const md_upload = multipart({ uploadDir: './uploads/song'});

api.get('/song/:id', md_auth.ensureAuth, SongController.getSong);
api.get('/songs/:page?', md_auth.ensureAuth, SongController.getSongs);  /*? singnifica opcional*/
api.post('/song', md_auth.ensureAuth, SongController.saveSong);

module.exports = api;