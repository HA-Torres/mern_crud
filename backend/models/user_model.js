/*se carga la libreria de mongoose que sirve para poder mapear la db echa con mongo*/
const mongoose = require('mongoose');

const { Schema } = mongoose;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const user = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    last_name: {
        type: String,
        required: true,
        minlength: 1
    },
    username: {
        type: String,
        required: true,
        minlength: 1
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Por favor ingresa un correo valido'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type: String,
        trim: true,
        required: true,
        minlength: 6
    },
},{
    timeStamp: true
    });

module.exports = mongoose.model('User', user);