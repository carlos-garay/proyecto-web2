const express = require('express')

const routes = require('./src/routes') //carpeta que trae rutas particulares, el router
require('dotenv').config()
const mongoose = require('mongoose');
const cors = require('cors');

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerConf = require('./swagger.config')

const socketIo = require('socket.io')

const app = express()

const mongoUrl = process.env.MONGO_URL

mongoose.connect(mongoUrl,{autoIndex: false})
  .then( () => {
    console.log('se conecto correctamente a la base de datos ')
    const server = app.listen (port, function () {
        console.log('runing pog in : '+ port)
    })

    //codigo de sockets
    const io = socketIo(server,{
      cors:{
          origin:'*',
          methods:['GET','POST','PUT','DELETE','OPTIONS']
      }
    })

    io.on('connection',socket =>{
      io.emit('alguien se conecto');
      console.log('se conecto alguien ');

      //funciones específicas de sockets

      //suscribirnos al canal cuando nos unamos a este 
      socket.on('joinDM',(data)=>{
        let idChannel = data.idChannel
        socket.join(idChannel)
      })

      socket.on('leaveDM',(data)=>{
        console.log('leaving chat')
        let idChannel = data.idChannel
        socket.leave(idChannel)
      })

      socket.on('sendMessageDM',(data)=>{
        let idChannel = data.idChannel
        let message = data.message
        socket.to(idChannel).emit('newMessageDM',message)
      })

      socket.on('joinGroupText',(data)=>{
        let idChannel = data.idChannel
        socket.join(idChannel)
      })

      socket.on('leaveGroupText',(data)=>{
        console.log('leaving chat')
        let idChannel = data.idChannel
        socket.leave(idChannel)
      })

      socket.on('sendMessageGroup',(data)=>{
        let idChannel = data.idChannel
        let message = data.message
        socket.to(idChannel).emit('newMessageGroup',message)
      })

      //cuando agregan un usuario a un grupo 
      socket.on('addUserToGroup',(data)=>{
        io.emit('addedToGroup',data)
      })

    })

  }).catch(err => {
    console.log('no se pudo conectar', err);
  });

const port = process.env.PORT



app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization, auth, user,token,urlFile');

  next();
});

app.use(express.json()); // Use express body-parser to parse all request bodies.

const swaggerDocs = swaggerJsDoc(swaggerConf)

app.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerDocs))

app.use('',routes) 


