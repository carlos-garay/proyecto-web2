const express = require('express')

const routes = require('./src/rutas') //carpeta que trae rutas particulares, el router
require('dotenv').config()
const mongoose = require('mongoose');

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerConf = require('./swagger.config')


const app = express()

const mongoUrl = process.env.MONGO_URL

mongoose.connect(mongoUrl)
  .then( () => {
    console.log('se conecto correctamente a la base de datos ')
    app.listen (port, function () {
        console.log('runing pog in : '+ port)
    })
  }).catch(err => {
    console.log('no se pudo conectar', err);
  });

const port = process.env.PORT

const swaggerDocs = swaggerJsDoc(swaggerConf)

app.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerDocs))

app.use('',routes) 


