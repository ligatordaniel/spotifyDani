'use strict'
const path = require('path');
const fs = require('fs');
const mongoosePaginate  = require('mongoose-pagination');

const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');
const album = require('../models/album');


/*Get 1 Album*/
const getAlbum = (req, res) => {
    res.status(200).send({message: 'esta mierda funciona'})
}
/*Get 1 Album*/


module.exports = {
    getAlbum,
}