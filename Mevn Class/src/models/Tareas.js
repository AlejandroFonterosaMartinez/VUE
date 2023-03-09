const mongoose = require('mongoose');
const { Schema }  = mongoose;

const Tarea = new Schema({
    titulo: String,
    descripcion: String
});

module.exports = mongoose.model('Tarea', Tarea);