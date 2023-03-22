const express = require('express')
const router = express.Router()
const groupsController = require('../controllers/groups')

//
const rutasChannels = require('./channels')
router.use('/:idGroup/channels',rutasChannels)

//post 

//put

//get

//get:id

//delete:id

module.exports = router