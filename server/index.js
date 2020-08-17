//importar express y dependencias
const express = require('express');
const path = require('path');
const routes = require('./routes');
const bodyParser = require('body-parser')

require('dotenv').config({ path: 'variables.env'})

//conectar a la base de datos (models)
const configs = require('./config');
const db = require('./config/database');
db.authenticate()
    .then(() => console.log('DB conectada'))
    .catch(error => console.log(error))

//instanciar express
const app = express();

//habilitar pug
app.set('view engine', 'pug');

//añadir las vistas
app.set('views', path.join(__dirname, './views'));

//cargar una carpeta estaticallamada public
app.use(express.static('public'));

//validar si estamos en desarrollo o en produccion
const config = configs[app.get('env')];

//creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

//muestra el año actual y genera la ruta para el nav
app.use((req, res, next) => {
    //crear nueva fecha
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path;
    return next();
})

//ejecutamos el body-parser
app.use(bodyParser.urlencoded({extended: true}))

//cargar rutas
app.use('/', routes() );

//puerto y host para la app
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => console.log('servidor funcionando'));