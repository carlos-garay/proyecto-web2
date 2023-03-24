const express = require('express')
const router = express.Router({mergeParams: true})
const groupsController = require('../controllers/groups')

//yo hago estos 

//
const rutasChannels = require('./channels')
router.use('/:idGroup/channels',rutasChannels)

//post 

//put

//get

//get:id

//delete:id

module.exports = router