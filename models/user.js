const mongoose = require('mongoose');
const schema = mongoose.Schema;


const userSchema = schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String,
    image: String
    /*id se genera sola*/

});

module.exports = mongoose.model('user', userSchema);