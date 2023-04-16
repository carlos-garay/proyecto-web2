const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

//las rutas de los requests
const rutasRequests = require('./requests')

router.use('/:idUser/requests',rutasRequests);


router.post('/register',express.json(),usersController.registerUser);

/**
 * @swagger
 * /users/register:
 *  post:
 *    tags:
 *      - User
 *    description: El usuario se registra en la aplicación proporcionando nombre, email y contraseña
 *    parameters:
 *      - in: body
 *        name: user
 *        description: objeto con el nombre, email y contraseña
 * 
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              example: "Usuario precargado1"
 * 
 *            email:
 *              type: string
 *              example: "otro1@test.com"
 * 
 *            password:
 *              type: string
 *              example: "password"
 * 
 *    responses:
 *      201:
 *        description: id del usuario creado
 *        schema:
 *          type: string
 *          example: "643b02446664b9a3efbf1e60"
 * 
 *      500:
 *        description: Error en el servidor
 */


router.post('/login',express.json(),usersController.loginUser);
/**
 * @swagger
 * /users/login:
 *  post:
 *    tags:
 *      - User
 *    description: El usuario hace login en la aplicación proporcionando email y contraseña
 *    parameters:
 *      - in: body
 *        name: user
 *        description: objeto con el email y contraseña
 * 
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *              example: "otro1@test.com"
 * 
 *            password:
 *              type: string
 *              example: "password"
 * 
 *    responses:
 *      201:
 *        description: id del usuario que hizo login
 *        schema:
 *          type: string
 *          example: "643b02446664b9a3efbf1e60"
 * 
 *      500:
 *        description: Error en el servidor
 */

router.get('/:idUser',usersController.loadUser);
/**
 * @swagger
 * /users/{idUser}:
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
 *        schema:
 *          example:
 *            application/json:
 *              {
 *                  "_id": "643aed8b64f01a772cb50353",
 *                  "name": "usuario1",
 *                  "email": "otro1@test.com",
 *                  "password": "password",
 *                  "token": "undefined",
 *                  "arrGroups": [
 *                      {
 *                      "_id": "643b6d6f23cf96aafcebfb06",
 *                      "title": "grupo1",
 *                      "image": "noimage",
 *                      "arrUsers": [
 *                          "643aed8b64f01a772cb50353",
 *                          "643af5d692b9f9f15fb1544b",
 *                          "643b02446664b9a3efbf1e60"
 *                      ],
 *                      "arrAdmins": [
 *                          "643aed8b64f01a772cb50353"
 *                      ],
 *                      "arrChannels": [
 *                          "643b898e18c959b67911bae3"
 *                      ],
 *                      "arrAudioChannels": [
 *                          "643b8cb186388eeae83cec80"
 *                      ],
 *                      "__v": 0
 *                      }
 *                  ],
 *                  "arrFriends": [],
 *                  "arrRequestsSent": [
 *                      {
 *                      "_id": "643b678619262fca193b0fb2",
 *                      "sender": "643aed8b64f01a772cb50353",
 *                      "receiver": "643af5d692b9f9f15fb1544b",
 *                      "status": 1,
 *                      "__v": 0
 *                      }
 *                  ],
 *                  "arrRequestsReceived": [],
 *                  "arrDirectMessages": [],
 *                  "__v": 0
 *                  }  
 *      404:
 *        description: No se encontro el usuario con el id idUSer
 */


router.put('/:idUser/name',express.json(),usersController.updateUserName);
/**
 * @swagger
 * /users/{idUser}/name:
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
 *          example: 
 *            {"name":"Cambio" }
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
 * /users/{idUser}/password:
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
 *          example: 
 *            {"password":"cambiopassword" } 
 *    responses:
 *      200:
 *        description: mensaje se actualizó el usuario y su nombre nuevo
 *      404:
 *        description: No se encontro el usuario con el id idUSer
 */

router.delete('/:idUser/friends/:idFriend/remove',usersController.removeFriend);
//users/:idUser/friends/:idFriend/remove      

/**
 * @swagger
 * /users/{idUser}/friends/{idFriend}/remove:
 *  delete:
 *    tags:
 *      - User
 *    description: se elimina un amigo 
 *    parameters:
 *      - in: path
 *        name: idUser
 *        description: id del usuario a obtener
 *        schema:
 *          type: string
 *      - in: path
 *        name: idFriend
 *        description: id del amigo que quieres borrar 
 *        schema:
 *          type: string
 * 
 *    responses:
 *      200:
 *        description: se elimino exitosamente el amigo
 *      404:
 *        description: error al encontrar el usuario amigo o el chat entre estos
 *      400:
 *        description: error al eliminar del arreglo de amigos o el chat 
 */

module.exports = router