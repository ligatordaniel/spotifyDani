'use strict'
const path = require('path');
const fs = require('fs');

const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');


/*Get artista*/
const getArtist = (req, res) => {
    let artistId = req.params.id;

    Artist.findById(artistId, (err, artist) => {
        if(err){
            res.status(500).send({message: 'error en la peticion'});
        }else{
            if(!artist){
                res.status(404).send({message: 'el artista no existe'});
            }else{
                res.status(200).send({artist});
            }
        }
    });
}
/*Get artista*/

/*Guardar  artista*/
const saveArtist = (req, res) => {
    let artist = new Artist();

    let params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null'

    artist.save((err,artistStored) => {
        if(err){
            res.status(404).send({message: 'Error al guardar artista'});
        }else{
            if(!artistStored){
                res.status(404).send({message: 'el artista no ha sido guardado'});
            }else{
                res.status(200).send({artist: artistStored});
            }
        }
    });
}
/*Guardar  artista*/

module.exports = {
    getArtist,
    saveArtist
}