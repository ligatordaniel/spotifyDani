'use strict'
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const artistSchema = schema({
    name: String,
    description: String,
    image: String

});

module.exports = mongoose.model('artist', artistSchema);