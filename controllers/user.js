'use strict'
const User = require('../models/user');
const jwt = require('../services/jwt');
const bcrypt = require('bcrypt-nodejs');
const fs = require('fs');  /*modulo fs*/
const path = require('path'); /*modulo path*/

/*probar controlador*/
const pruebas = (req, res) => {
    res.status(200).send({
        message: 'Probando acción controlador de usuarios con api rest'
    });
  };
/*probar controlador*/

/*Registro usuario*/
const saveUser = (req, res) => {
    let user = new User();
    let params = req.body;

    console.log(params);
    
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER'; /*user.role = 'ROLE_ADMIN'   user.role = 'ROLE_USER' ;*/
    user.image = 'null';

    if(params.password){
        /*encriptar contraseña o hasheada*/
        bcrypt.hash(params.password, null, null, (err,hash) => {
            user.password = hash;

            if(user.name != null && user.surname != null && user.email != null){
                /*guardar usuario-metodo mongoose*/
                user.save((err, userStored) => {
                    if(err){
                        res.status(500).send({message: 'Error al guardar usuario'});
                    }else{
                        if(!userStored){    /*si no existe userStored o no lo ha guardado*/
                            res.status(404).send({message: 'No se ha registrado el usuario'});
                        }else{
                            res.status(200).send({user: userStored});
                        }
                    }
                });
            }else{
                res.status(200).send({message:'Rellena todos los campos'});
            }
        });
    }else{
        res.status(200).send({message:'Introduce la contraseña'});
    }
  }
/*Registro usuario*/

/*Login usuario*/
const loginUser = (req, res) => {
    let params = req.body;
    let email = params.email;
    let password = params.password;
    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500).send({message:'Error en la petición'});
        }else{
            if(!user){
                res.status(404).send({message:'Usuario no existe'});
            }else{
                //Comprobar Contraseña
                bcrypt.compare(password, user.password, (err,check) => {
                    if(check){
                        /*devolver los datos del usuario logeado*/
                        if(params.gethash){
                            //devolver token jwt
                            res.status(200).send({  
                                token: jwt.createToken(user)
                            });
                        }else{
                            res.status(200).send({user});
                        }
                    }else{
                        res.status(400).send({message:'usuario no ha podido logear'});
                    }
                });
            }
        }
    });
}
/*Login usuario*/
/*Editar usuario*/
const updateUser = (req,res) => {
    let userId = req.params.id;
    let update = req.body;

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if(err){
            res.status(500).send({message: 'Error del servidor, al actualizar usuario'});
        }else{
            if(!userUpdated){
                res.status(404).send({message: 'no se ha podido actualizar el usuario'});
            }else{
                res.status(200).send({user: userUpdated});
            }
        }
    });
}
/*Editar usuario*/
/*Subir fotoPerfil*/
const uploadImage = (req, res) => {
    let userId = req.params.id;
    let file_name = 'No subido...';

    if(req.files){
        let file_path = req.files.image.path;
        let file_split = file_path.split('\\');
        let file_name = file_split[2];

        let ext_split = file_name.split('\.');
        let file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){           
            User.findByIdAndUpdate(userId,{image: file_name},(err, userUpdated)=>{
                if(!userUpdated){
                    res.status(200).send({message: 'no se puede actualizar la foto'});
                }else{
                    res.status(200).send({user: userUpdated});
                }
            });
        }else {
            res.status(200).send({message: 'Formato no es png, jpg o gif...'})};
        
    }else{
        res.status(200).send({message: 'No has subido ninguna imagen...'});
    }
}
/*Subir fotoPerfil*/

/*metodo que nos devuelva fichero con img*/  /*da mas seguridad por alguna razon*/
const getImageFile = (req,res) => {
    let imageFile = req.params.imageFile;
    let path_file = './uploads/users/'+imageFile;
    
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'no existe la imagen...'});
        }
    });
}
/*metodo que nos devuelva fichero con img*/


module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
}
