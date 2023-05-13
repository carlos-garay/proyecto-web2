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

const socketsStatus = {};

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
      
      //cuando se eliina un grupo, borrarlo de todos los usuarios, falta por implementar

      //VOICE CHAT BOOGALOO

      // const socketId = socket.id
      // socketsStatus[socket.id] = {}; // este camarada 

      socket.on('joinVoice',(data)=>{ //unirse al room al cargar canal
        let idChannel = data.idChannel
        //mandar el usuario que se unio 
        console.log('se unieron a '+idChannel)
        socket.join(idChannel)
      })

      socket.on('leaveVoice',(data)=>{ //desconectarse del canal de voz 
        let idChannel = data.idChannel
        console.log('se salieron de'+idChannel)
        socket.leave(idChannel)
      })

      //necesitamos modificar el data que trae este carnal 
      socket.on('voice', (dataIn) =>{
        console.log('voiceman')
        console.log(dataIn)
        var data =dataIn.data
        var idChannel = data.idChannel
        var newData = data.split(";");
        newData[0] = "data:audio/ogg;";
        newData = newData[0] + newData[1];
        //socket.broadcast.to(idChannel).emit("send", newData);
        socket.to(idChannel).emit('send',newData)

        //esta parte no se va a ocupar porque no voy a implementar socketStatus
        // for (const id in socketsStatus) {
    
        //   if (id != socketId && !socketsStatus[id].mute && socketsStatus[id].online)
        //     socket.broadcast.to(id).emit("send", newData);
        //     socket.to(idChannel).emit('newMessageGroup',message)
        // }
    
      });

      //transmitir constantemente la lista de miembros
      socket.on("userInformation", (data) => {

        socket.to(idChannel).emit('getUserInfo',newData)
      });
    })

  }).catch(err => {
    console.log('no se pudo conectar', err);
  });

const port = process.env.PORT



app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization, auth, user,token');

  next();
});

app.use(express.json()); // Use express body-parser to parse all request bodies.

const swaggerDocs = swaggerJsDoc(swaggerConf)

app.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerDocs))

app.use('',routes) 


