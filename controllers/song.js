'use strict'
const path = require('path');
const fs = require('fs');
const mongoosePaginate  = require('mongoose-pagination');

const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');


/*Get 1 Song*/
const getSong = (req, res) => {
    res.status(200).send({message: 'este controlador funciona'});
}  
/*Get 1 Song*/


module.exports = {
    getSong,
}
