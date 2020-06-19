'use strict'
const path = require('path');
const fs = require('fs');
const mongoosePaginate  = require('mongoose-pagination');

const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');


/*Get 1 Song*/ 
const getSong = (req, res) => {
    const songId = req.params.id; /*id de la url*/
    /*metodo populate: popule los datos asosciados al id artist en la db*/
    /*metodo exec: ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.*/
    Song.findById(songId).populate({path: 'album'}).exec((err, song) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion -servidor-'});
        }else{
            if(!song){
                res.status(404).send({message: 'la cancion no existe'});
            }else{
                res.status(200).send({song});
            }
        }
    });
}  
/*Get 1 Song*/

/*Guardar song*/
const saveSong = (req, res) => {
    const song = new Song();

    const params = req.body;
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
