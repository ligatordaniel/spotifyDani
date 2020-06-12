'use strict'
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const albumSchema = schema({
    title: String,
    description: String,
    year: Number,
    image: String,
    artist: { type: schema.ObjectId, ref: 'artist'}    /*vincula a otro modelo e id*/

});

module.exports = mongoose.model('album', albumSchema);