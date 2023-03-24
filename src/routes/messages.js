const express = require('express')
const router = express.Router({mergeParams: true})
const messagesController = require('../controllers/messages')

//para estar aqui ya pase por groups/:idGroup/channels/:idChannel/messages

//post
router.post('/',express.json(),messagesController.crearMensaje)


module.exports = router