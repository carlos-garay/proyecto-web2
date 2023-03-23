const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

//las rutas de los requests
const rutasRequests = require('./requests')
router.use('/:idUser/requests',rutasRequests);

router.post('/register',express.json(),usersController.registerUser);

router.get('/:idUser',usersController.loadUser);

router.put('/:idUser/name',express.json(),usersController.updateUserName);

router.put('/:idUser/password',express.json(),usersController.updateUserPassword);

module.exports = router