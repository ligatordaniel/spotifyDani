'use strict'
const express = require('express');          /*cargamos libreria express de node_modules*/
const bodyParser = require('body-parser');   /*cargamos libreria body-parser de node_modules*/

const app = express();          /*creamos el objeto express*/

/*Cargar rutas*/
const user_routes = require('./routes/user');       

app.use(bodyParser.urlencoded({extended:false}));   /*configuracion body-parser para trabajar json con http*/
app.use(bodyParser.json());                         /*configuracion body-parser para trabajar json con http*/

/*Confi cabeceras http*/

/*Rutas base*/
app.use('/api', user_routes);   /*http://localhost:3977/api/probando-controlador*/



module.exports = app;           /*exportamos para que index.js lo importe*/