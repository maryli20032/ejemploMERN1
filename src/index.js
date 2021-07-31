//archivo del servidor. archivo de nodejs
//gracias a este archivo vamos a arrancar el servidor


const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const {mongoose} = require('./database');

// seccion de configuracion 
app.set('port', process.env.PORT || 3000) //configura el puerto que va a utilizar la app dada por el hosting o usa el puerto 3000 por defecto

//middlware: son funciones que se ejecutan antes de las rutas
app.use(morgan('dev')); //muestra en la consola las peticiones que le hacen los clientes al servidor
app.use(express.json());//cuando llega algo al servidor verifica si es un archivo json para luego utilizarlo

//rutas
app.use('/api/tasks', require('./routes/task.routes'))

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public'))); //le digo al servidor que muestre lo que esta en la carpeta public

//empezar el servidor
app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`);
}); //escucha el puerto que se configuro anterior mente