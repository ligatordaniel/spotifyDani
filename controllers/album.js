'use strict'
const path = require('path');
const fs = require('fs');
const mongoosePaginate  = require('mongoose-pagination');

const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');



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
            if(!Album){
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

/*Actualizar Album*/
const updateAlbum = (req, res) => {
    let albumId = req.params.id;
    let updated = req.body;

    Album.findByIdAndUpdate(albumId, updated, (err, albumUpdated) => {
        if(err){
            res.status(500).send({message: 'Error al guardar album -servidor-'});
        }else{
            if(!albumUpdated){
                res.status(404).send({message: 'el album no ha actualizado'});
            }else{
                res.status(200).send({album: albumUpdated});
            }
        }
    });
}
/*Actualizar Album*/

/*Delete Album*/
const deleteAlbum = (req, res) => {
    let albumId = req.params.id;
    
        Album.findByIdAndRemove(albumId, (err, albumRemoved) => {
            if(err){
                res.status(500).send({message: 'Error al eliminar album -servidor-'});
            }else{
                if(!albumRemoved){
                    res.status(404).send({message: 'album no ha sido eliminado'});
                }else{
                    Song.find({album: albumRemoved._id}).deleteOne((err, songRemoved) => {
                      if(err){
                        res.status(500).send({message: 'Error al eliminar la cancion -servidor-'});
                      }else{
                        if(!songRemoved){
                            res.status(404).send({message: 'Error al eliminar la cancion'});
                        }else{
                            res.status(200).send({albumRemoved});
                        }
                    }
                });
            }
        }
    });
}
/*Delete Album*/

/*subir imagen Album*/
const uploadImage = (req, res) => {
    const albumId = req.params.id;
    const file_name = 'No subido...';   

    if(req.files){
        const file_path = req.files.image.path;
        const file_split = file_path.split('\\');
        const file_name = file_split[2];

        const ext_split = file_name.split('\.');
        const file_ext = ext_split[1];

        if(file_ext === 'png' || file_ext === 'jpg' || file_ext === 'gif'){           
            Album.findByIdAndUpdate(albumId,{image: file_name}, (err, albumUpdated) => {
                if(!albumUpdated){
                    res.status(404).send({message: 'no se puede actualizar la foto'});
                }else{
                    res.status(200).send({album: albumUpdated});
                }
            });
        }else {
            res.status(200).send({message: 'Formato no es png, jpg o gif...'})};
        
    }else{
        res.status(200).send({message: 'No has subido ninguna imagen...'});
    }
}
/*subir imagen Album*/

/*vizualizar img con ubicacion*/  /*da mas seguridad por alguna razon*/
const getImageFile = (req,res) => {
    const imageFile = req.params.imageFile;
    const path_file = './uploads/albums/'+imageFile;
    
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'no existe la imagen...'});
        }
    });
}
/*vizualizar img con ubicacion*/

module.exports = {
    getAlbum,
    getAlbums,
    saveAlbum,
    updateAlbum,
    deleteAlbum,
    uploadImage,
    getImageFile
}
