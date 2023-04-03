const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
//conf para variable de entorno con el archivo .env y npm i dotenv
require('dotenv').config();

// Crear el servidor de express
const app = express();

// Data Base
dbConnection();

// CORS
app.use( cors() );

//Directorio publico
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );


//rutas
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );

app.get('*', ( req, resp ) => {
    resp.sendFile( __dirname + '/public/index.html');
})

// TODO: CRUD: eventos

//Escuchar preticiones
app.listen( process.env.PORT, () => {
    console.log(`Server running on port ${ process.env.PORT }`);
});
