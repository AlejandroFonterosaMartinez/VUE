const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const {createCommentVNode} = require("vue");

mongoose.connect('mongodb://127.0.0.1/mevnclass')
   .then(db => console.log('Base de datos conectada'))
   .catch( err => console.log(err));

// Configuración de express

app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/tareas', require('./routes/tareas'))


//ficheros estáticos
app.use(express.static(__dirname + '/public'))

//puertos escucha servidor
app.listen(app.get('port'), () => {
   console.log('Servidor a la escucha en el puerto ', app.get('port'))
});
