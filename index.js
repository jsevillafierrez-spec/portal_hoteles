// Importamos el modulo 'express' que nos permite crear aplicacionesnweb de manera sencilla
import express from 'express';
import router from './routers/index.js';
import res from "express/lib/response.js"
import db from "./config/db.js"

// Creamos una instancia de la aplicacion express
const app = express();

// Conectar a la base de datos
db.authenticate()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.log(err));

// Definimos el puerto en el que el servidor va a escuchar.
// Si hay una variable de entorno PORT, se usa esa, de lo contrario, se usa el puerto establecido
const port = process.env.PORT || 4000;

// Middleware es app
// Habilitar PUG
app.set('view engine', 'pug');

// Middleware global para definir el año
app.use((req,res,next)=>{
    const year = new Date().getFullYear();
    res.locals.year = year; // Esto agrega el año a res.locals
    res.locals.nombreP = 'Portal de Hoteles';
    next(); // Llamamos a next() para pasar al siguiente middleware o ruta
});

// Definir la carpeta publica
app.use(express.static('public'));

// Middleware para analizar datos de formularios (application/x-www-form-urlencoded)
//el servidor esté configurado para analizar los datos del formulario. En Express,//
app.use(express.urlencoded({ extended: true }));

// Agregamos router
app.use('/', router);

// Configuramos el servidor para que escuche en  el puerto definido y, cuando
// se ejecute la funcion de callback que imprime un mensaje en la consola.
app.listen(port, () => {
    console.log('Servidor corriendo en el puerto: ' + port);
});