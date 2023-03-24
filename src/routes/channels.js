const express = require('express')
const router = express.Router({mergeParams: true})
const channelsController = require('../controllers/channels')

//incluir rutas de mensajes
const rutasMessages = require('./messages')

router.use('/:idChannel/messages',rutasMessages);

router.post('/',express.json(),channelsController.createChannel);

router.put('/:idChannel/addMember',express.json(),channelsController.addMemberToChannel);

router.put('/:idChannel/removeMember',express.json(),channelsController.removeMemberFromChannel);

router.delete('/:idChannel',channelsController.deleteChannel);

module.exports = router