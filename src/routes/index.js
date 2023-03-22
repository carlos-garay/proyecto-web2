const router = require('express').Router()
//const rutasChannels = require('./channels')
const rutasGroups = require('./groups')
//const rutasMessages = require('./messages')
const rutasUsers = require('./users')

//falta por definir como van a quedar los endpoints porque satanas

router.use('/users',rutasUsers)
//router.use('/channels',rutasChannels)
router.use('/groups',rutasGroups)
//router.use('/messages',rutasMessages)

// ruta: /groups/:idgroup/channels

module.exports = router;