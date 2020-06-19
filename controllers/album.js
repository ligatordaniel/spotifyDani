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
    let albumId = req.params.id; /*id de la url*/
    /*metodo populate: popule los datos asosciados al id artist en la db*/
    /*metodo exec: ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.*/
    Album.findById(albumId).populate({path: 'artist'}).exec((err, album) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion -servidor-'});
        }else{
            if(!album){
                res.status(404).send({message: 'el album no existe'});
            }else{
                res.status(200).send({album});
            }
        }
    });
}  
/*Get 1 Album*/
/*Get all Albums*/
const getAlbums = (req, res) => {
    let artistId = req.params.artist;
    let find = '';

    if(!artistId){
        /*sacar albums de la DB*/
        find = Album.find({}).sort('title');
    }else{
        /*sacar albums de un artista en concreto con su id desde la DB*/
        find = Album.find({artist: artistId}).sort('year');
    }
    find.populate({path: 'artist'}).exec((err, albums) => {
        if (err){
            res.status(500).send({message:'Error de la peticion -servidor-'});
        }else{
            if(!album){
                res.status(404).send({message:'No hay albums'});
            }else{
                res.status(200).send({albums});
            }
        }
    });
}
/*Get all Albums*/
/*Guardar Album*/
const saveAlbum = (req, res) => {
    let album = new Album();

    let params = req.body;
    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null';
    album.artist = params.artist;

    album.save((err,albumStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar album -servidor-'});
        }else{
            if(!albumStored){
                res.status(404).send({message: 'el album no ha sido guardado'});
            }else{
                res.status(200).send({album: albumStored});
            }
        }
    });
}
/*Guardar Album*/

module.exports = {
    getAlbum,
    getAlbums,
    saveAlbum
}

/*
https://www.udemy.com/course/desarrollo-web-con-javascript-angular-nodejs-y-mongodb/learn/lecture/6446816#questions/11275106
*/