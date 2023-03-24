const express = require('express')
const router = express.Router({mergeParams: true})
const audioChannelController = require('../controllers/audioChannels')

router.post('/',express.json(),audioChannelController.createAudioChannel);

router.put('/:idChannel/addMember',express.json(),audioChannelController.addMemberToAudioChannel);

router.put('/:idChannel/removeMember',express.json(),audioChannelController.removeMemberFromAudioChannel);

router.delete('/:idChannel',audioChannelController.deleteAudioChannel);

module.exports = router