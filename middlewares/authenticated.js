'use strict' /*con middleware protegeremos las rutas */
const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_secreta_curso';


exports.ensureAuth = (req,res,next) => {
    if(!req.headers.authorization){  /*en caso de  no venir con token*/
        return res.status(403).send({message: 'la peticion no tiene la cabecera de autentificacion'});
    }

    let token = req.headers.authorization.replace(/['"]+/g,''); /*quita simbolos del token*/
    let payload = '';
    
    try{
        payload = jwt.decode(token,secret); /*no funcion con const o le no se porque*/
        
        if(payload.exp <= moment().unix()){
            return res.status(401).send({message:'el token ha expirado'});
        }
    }catch(ex){
        /*console.log(ex);*/
        return res.status(404).send({message:'token no valido'});
    }

    req.user = payload;
    
    next();
}