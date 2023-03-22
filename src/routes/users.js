const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

//las rutas de los requests
const rutasRequests = require('./requests')
router.use('/:idUser/requests',rutasRequests)

//post 

//put

//get

//get:id

//delete:id

module.exports = router