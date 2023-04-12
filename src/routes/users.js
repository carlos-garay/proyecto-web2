const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

//las rutas de los requests
const rutasRequests = require('./requests')

router.use('/:idUser/requests',rutasRequests);



router.post('/register',express.json(),usersController.registerUser);

/**
 * @swagger
 * /user:
 *  post:
 *    tags:
 *      - User
 *    description: El usuario se registra en la aplicación proporcionando nombre, email y contraseña
 *    parameters:
 *      - in: body
 *        name: user
 *        description: objeto con el nombre, email y contraseña
 *        schema:
 *          type: object
 * 
 *    responses:
 *      201:
 *        description: mensaje se creo el usuario con su email
 *      500:
 *        description: Error en el servidor
 */


router.get('/:idUser',usersController.loadUser);
/**
 * @swagger
 * /user/{idUser}:
 *  get:
 *    tags:
 *      - User
 *    description: obtener los datos del usuario con sus friendrequests, amigos, grupos y mensajes directos para cargar en la página
 *    parameters:
 *      - in: path
 *        name: idUser
 *        description: id del usuario a obtener
 *        schema:
 *          type: string
 * 
 *    responses:
 *      200:
 *        description: objeto del usuario recuperado, con sus arreglos de ids a otras entidades populados 
 *      404:
 *        description: No se encontro el usuario con el id idUSer
 */


router.put('/:idUser/name',express.json(),usersController.updateUserName);
/**
 * @swagger
 * /user/{idUser}/name:
 *  put:
 *    tags:
 *      - User
 *    description: se cambia el nombre del usuario
 *    parameters:
 *      - in: path
 *        name: idUser
 *        description: id del usuario a obtener
 *        schema:
 *          type: string
 * 
 *      - in: body
 *        name: name
 *        description: nombre del usuario a cambiar
 *        schema:
 *          type: object
 * 
 *    responses:
 *      200:
 *        description: mensaje se actualizó el usuario y su nombre nuevo
 *      404:
 *        description: No se encontro el usuario con el id idUSer
 */


router.put('/:idUser/password',express.json(),usersController.updateUserPassword);
/**
 * @swagger
 * /user/{idUser}/password:
 *  put:
 *    tags:
 *      - User
 *    description: se cambia el nombre del usuario
 *    parameters:
 *      - in: path
 *        name: idUser
 *        description: id del usuario a obtener
 *        schema:
 *          type: string
 * 
 *      - in: body
 *        name: name
 *        description: nombre del usuario a cambiar
 *        schema:
 *          type: object
 * 
 *    responses:
 *      200:
 *        description: mensaje se actualizó el usuario y su nombre nuevo
 *      404:
 *        description: No se encontro el usuario con el id idUSer
 */


module.exports = router