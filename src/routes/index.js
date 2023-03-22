const router = require('express').Router()
const rutasChannels = require('./channels')
const rutasGroups = require('./groups')
const rutasMessages = require('./messages')
const rutasUsers = require('./users')

//falta por definir como van a quedar los endpoints porque 

router.use('/users',rutasUsers)
router.use('/channels',rutasChannels)
router.use('/groups',rutasTareas)


module.exports = router;