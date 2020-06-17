'use strict'
const path = require('path');
const fs = require('fs');
const mongoosePaginate  = require('mongoose-pagination');

const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');


/*Get 1 artista*/
const getArtist = (req, res) => {
    let artistId = req.params.id;

    Artist.findById(artistId, (err, artist) => {
        if(err){
            res.status(500).send({message: 'error en la peticion al servidor'});
        }else{
            if(!artist){
                res.status(404).send({message: 'el artista no existe'});
            }else{
                res.status(200).send({artist});
            }
        }
    });
}
/*Get 1 artista*/
/*Get all artistas*/
const getArtists = (req, res) => {

    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }

    var itemsPerPage = 3;

    Artist.find().sort('name').paginate(page, itemsPerPage, (err, artists, total) => {
        if(err){
            res.status(500).send({message: 'error en la peticion al servidor'});
        }else{
            if(!artists){
                res.status(404).send({message: 'no hay artistas!'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    artists: artists
                })
            }
        }
    });
}
/*Get all artistas*/

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
    getArtists,
    saveArtist
}