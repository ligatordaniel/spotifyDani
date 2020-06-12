'use strict'
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const songSchema = schema({
    number: String,
    name: String,
    duration: Number,
    file: String,
    album: { type: schema.ObjectId, ref: 'album'}    /*vincula a otro modelo e id*/

});

module.exports = mongoose.model('song', songSchema);