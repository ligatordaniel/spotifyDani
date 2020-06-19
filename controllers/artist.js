'use strict'
const path = require('path');
const fs = require('fs');
const mongoosePaginate  = require('mongoose-pagination');

const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');
const album = require('../models/album');


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
    let page = '';
    if(req.params.page){
        page = req.params.page;
    }else{
        page = 1;
    }
    
    let itemsPerPage = 20;
    
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
    artist.image = 'null';

    artist.save((err,artistStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar artista -servidor-'});
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

/*Actualizar  artista*/
const updateArtist = (req, res) => {
    let artistId = req.params.id;
    let updated = req.body;

    Artist.findByIdAndUpdate(artistId, updated, (err, artistUpdated) => {
        if(err){
            res.status(500).send({message: 'Error al guardar artista -servidor-'});
        }else{
            if(!artistUpdated){
                res.status(404).send({message: 'el artista no ha actualizado'});
            }else{
                res.status(200).send({artist: artistUpdated});
            }
        }
    });
}
/*Actualizar  artista*/

/*Delete  artista*/
const deleteArtist = (req, res) => {
    let artistId = req.params.id;
    
    Artist.findByIdAndRemove(artistId, (err, artistRemoved) => {
        if(err){
            res.status(500).send({message: 'Error al eliminar artista -servidor-'});
        }else{
            if(!artistRemoved){
                res.status(404).send({message: 'Error al eliminar artista'});
            }else{
                Album.find({artist: artistRemoved._id}).deleteOne((err, albumRemoved) => {
                    if(err){
                        res.status(500).send({message: 'album no ha sido eliminado -servidor-'});
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
                                        res.status(200).send({artistRemoved});
                                    }
                                }
                            });
                        }
                    }
                });

            }
        }
    });
}
/*Delete  artista*/
/*subir imagen artista*/
const uploadImage = (req, res) => {
    let artistId = req.params.id;
    let file_name = 'No subido...';

    if(req.files){
        let file_path = req.files.image.path;
        let file_split = file_path.split('\\');
        let file_name = file_split[2];

        let ext_split = file_name.split('\.');
        let file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){           
            Artist.findByIdAndUpdate(artistId,{image: file_name}, (err, artistUpdated) => {
                if(!artistUpdated){
                    res.status(404).send({message: 'no se puede actualizar la foto'});
                }else{
                    res.status(200).send({artist: artistUpdated});
                }
            });
        }else {
            res.status(200).send({message: 'Formato no es png, jpg o gif...'})};
        
    }else{
        res.status(200).send({message: 'No has subido ninguna imagen...'});
    }
}
/*subir imagen artista*/

/*devolver img en su ubicacion*/  /*da mas seguridad por alguna razon*/
const getImageFile = (req,res) => {
    let imageFile = req.params.imageFile;
    let path_file = './uploads/artists/'+imageFile;
    
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'no existe la imagen...'});
        }
    });
}
/*devolver img en su ubicacion*/

module.exports = {
    getArtist,
    getArtists,
    saveArtist,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile
}