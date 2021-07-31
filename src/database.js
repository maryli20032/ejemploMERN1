// me permite conectarme a la base de datos, este archivo sera luego utilizado en el archivo index.js

const mongoose = require('mongoose');
const URI = 'mongodb://localhost/mern-task'; //aca va la URL de la base de datos, en este caso la local pero sino va la del servidor de db

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;