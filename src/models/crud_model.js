const mongoose = require('mongoose');
const { Schema } = mongoose;

const sch_nombre = new Schema({
    name:{type: String, required: true},
    apellido: {type: String, required: true}
});

module.exports = mongoose.model('nombre', sch_nombre);