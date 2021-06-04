const mongoose = require('mongoose');

const LoginSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String
});

const LoginModel = mongoose.model('Login', LoginSchema, 'Login');

module.exports = LoginModel;