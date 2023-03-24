const express = require('express')
const router = express.Router({mergeParams: true})
const groupsController = require('../controllers/groups')


//rutas de channels
const rutasChannels = require('./channels')
router.use('/:idGroup/channels',rutasChannels)
//rutas de audiochannels 
const rutasAudioChannels = require('./audioChannel')
router.use('/:idGroup/audioChannels',rutasAudioChannels)

//endpoints

router.post('/',express.json(),groupsController.createGroup)

router.delete('/:idGroup',groupsController.deleteGroup) //esta bien criminal este dude, borrar el arreglo de toda la lista de usuarios, borrar todos sus canales y borrar todos los mensajes LOOOOL


//agregar usuarios solamente será por medio de invitación, esa invitación es un link que llama este request
//el body va a traer el id del usuario que tiene sesion iniciada, que es quien se metera al grupo 
router.put('/:idGroup',express.json(),groupsController.addUserToGroup) //el body va a traer el user que quieres agregar 

router.get('/:idGroup',groupsController.getGroup) //traer todo lo de ese grupo, usamos populate 

router.put('/:idGroup/name',express.json(),groupsController.changeGroupName) // el body va a traer un atribuo llamado nombreGrupo



module.exports = router