'use strict'
const pruebas = (req, res) => {
    res.status(200).send({
        message: 'Probando acción controlador de usuarios con api rest'
    });
  };


const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');
const jwt = require('../services/jwt');

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
function updateUser(req,res){
    var userId = req.params.id;
    var update = req.body;

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


module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
}
