'use strict'

const express = require('express');
const SongController = require('../controllers/song');

const api = express.Router();
const md_auth = require ('../middlewares/authenticated');

const multipart = require('connect-multiparty'); /*necesario para img subidas song*/
const md_upload = multipart({ uploadDir: './uploads/songs'});

api.get('/song/:id', md_auth.ensureAuth, SongController.getSong);
api.get('/songs/:page?', md_auth.ensureAuth, SongController.getSongs);  /*? singnifica opcional*/
api.post('/song', md_auth.ensureAuth, SongController.saveSong);
api.put('/song/:id', md_auth.ensureAuth, SongController.updateSong);
api.delete('/song/:id', md_auth.ensureAuth, SongController.deleteSong);
api.post('/upload-file-song/:id',[md_auth.ensureAuth, md_upload], SongController.uploadFile);
api.get('/get-file-song/:songFile', SongController.getSongFile);

module.exports = api;