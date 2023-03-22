const express = require('express')
const router = express.Router()
const channelsController = require('../controllers/channels')

//incluir rutas de mensajes
const rutasMessages = require('./messages')

router.use('/:idChannel/messages',rutasMessages)

//post 

//put

//get

//get:id

//delete:id

module.exports = router