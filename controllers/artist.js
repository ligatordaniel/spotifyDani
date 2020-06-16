'use strict'
const path = require('path');
const fs = require('fs');

const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');

const getArtist = (req, res) => {
    res.status(200).send({message: 'Metodo getArtist del contrilador artist.js'});
}

module.exports = {
    getArtist
}