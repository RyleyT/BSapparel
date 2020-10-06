const mongoose = require('mongoose');
    userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    Address: String,
    name: String
});

module.exports = mongoose.model('User', userSchema);