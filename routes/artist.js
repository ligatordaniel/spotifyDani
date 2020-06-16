'use strict'

const express = require('express');
const ArtistController = require('../controllers/artist');

const api = express.Router();
const md_auth = require ('../middlewares/authenticated');

api.get('/artist', md_auth.ensureAuth, ArtistController.getArtist);

module.exports = api;

