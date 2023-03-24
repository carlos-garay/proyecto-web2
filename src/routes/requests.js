const express = require('express')
const router = express.Router({mergeParams: true})
const requestsController = require('../controllers/requests')

//la ruta para llegar aqui es 
//users/:idUser/requests

router.post('/',express.json(),requestsController.crearRequest)

router.put('/:reqId/accept',requestsController.acceptRequest)

router.put('/:reqId/decline',requestsController.declineRequest)

module.exports = router