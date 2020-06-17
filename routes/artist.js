'use strict'

const express = require('express');
const ArtistController = require('../controllers/artist');

const api = express.Router();
const md_auth = require ('../middlewares/authenticated');


api.get('/artist/:id', md_auth.ensureAuth, ArtistController.getArtist);
api.get('/artists/:page?', md_auth.ensureAuth, ArtistController.getArtists);  /*? singnifica opcional*/
api.post('/artist', md_auth.ensureAuth, ArtistController.saveArtist);

module.exports = api;

