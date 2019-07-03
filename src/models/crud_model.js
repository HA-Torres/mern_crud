/*se carga la libreria de mongoose que sirve para poder mapear la db echa con mongo*/
const mongoose = require('mongoose');
const { Schema } = mongoose;

/*se crea el modelo de datos que recibira MongoDB*/
const sch_nombre = new Schema({
    name:{type: String, required: true},
    apellido: {type: String, required: true}
});

/*se exporta el modelo para su posterior trabajo en otras clases*/
module.exports = mongoose.model('nombre', sch_nombre);