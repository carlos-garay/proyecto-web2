const router = require('express').Router()
//const rutasChannels = require('./channels')
const rutasGroups = require('./groups')
//const rutasMessages = require('./messages')
const rutasUsers = require('./users')

router.use('/users',rutasUsers)
//router.use('/channels',rutasChannels)
router.use('/groups',rutasGroups)
//router.use('/messages',rutasMessages)

module.exports = router;