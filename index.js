const express = require('express')

const routes = require('./src/routes') //carpeta que trae rutas particulares, el router
require('dotenv').config()
const mongoose = require('mongoose');
const cors = require('cors');

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerConf = require('./swagger.config')


const app = express()

const mongoUrl = process.env.MONGO_URL

mongoose.connect(mongoUrl,{autoIndex: false})
  .then( () => {
    console.log('se conecto correctamente a la base de datos ')
    app.listen (port, function () {
        console.log('runing pog in : '+ port)
    })
  }).catch(err => {
    console.log('no se pudo conectar', err);
  });

const port = process.env.PORT

app.use(cors({
  origin: ['http://127.0.0.1:4200'] 
}));

app.use(express.json()); // Use express body-parser to parse all request bodies.

const swaggerDocs = swaggerJsDoc(swaggerConf)

app.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerDocs))

app.use('',routes) 


