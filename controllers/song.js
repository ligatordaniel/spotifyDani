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

/*Guardar song*/
const saveSong = (req, res) => {
    let song = new Song();

    let params = req.body;
    song.number = params.number;
    song.name = params.name;
    song.duration = params.duration;
    song.file = 'null';
    song.album = params.album;

    song.save((err,songStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar song -servidor-'});
        }else{
            if(!songStored){
                res.status(404).send({message: 'el song no ha sido guardado'});
            }else{
                res.status(200).send({song: songStored});
            }
        }
    });
}
/*Guardar Song*/


module.exports = {
    getSong,
    saveSong
}
