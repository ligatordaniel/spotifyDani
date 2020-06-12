'use strict'
const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_secreta_curso';

exports.createToken = (user) => {
    const payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(14,'days').unix
    };
    return jwt.encode(payload, secret);
}; 


/*  https://www.udemy.com/course/desarrollo-web-con-javascript-angular-nodejs-y-mongodb/learn/lecture/6446616#overview   */