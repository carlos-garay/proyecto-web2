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
 *      400:
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
 *    description: obtener los datos del usuario con sus grupos para cargar en la página
 *    parameters:
 *      - in: path
 *        name: idUser
 *        description: id del usuario a obtener
 *        schema:
 *          type: string
 * 
 *    responses:
 *      200:
 *        description: objeto del usuario recuperado, con su arreglo de grupos poblado
 *        schema:
 *          example:
 *              {
 *               "_id": "643aed8b64f01a772cb50353",
 *               "name": "Usuario precargado1",
 *               "email": "otro1@test.com",
 *               "password": "password",
 *               "token": "undefined",
 *               "arrGroups": [
 *                   {
 *                       "_id": "643d910ee3f376459277de77",
 *                       "title": "grupo1",
 *                       "image": "noimage",
 *                       "arrUsers": [
 *                           "643aed8b64f01a772cb50353",
 *                           "643af5d692b9f9f15fb1544b"
 *                       ],
 *                       "arrAdmins": [
 *                           "643aed8b64f01a772cb50353"
 *                       ],
 *                       "arrChannels": [
 *                           "643dab07cd8ff99e26bc3f56",
 *                           "643dbf0527bc80c7910407c9"
 *                       ],
 *                       "arrAudioChannels": [
 *                           "643e07435919adb973eccb4d",
 *                           "643f8faf4fcc74d3d5301a00"
 *                       ],
 *                       "__v": 3
 *                       },
 *                       {
 *                       "_id": "643dbbb427bc80c7910407c4",
 *                       "title": "grupo2",
 *                       "image": "noimage",
 *                       "arrUsers": [
 *                           "643aed8b64f01a772cb50353",
 *                           "643af5d692b9f9f15fb1544b",
 *                           "643b02446664b9a3efbf1e60",
 *                           "643f5b1dae5c170d91ee8d99"
 *                       ],
 *                       "arrAdmins": [
 *                           "643aed8b64f01a772cb50353"
 *                       ],
 *                       "arrChannels": [
 *                           "643dbf1c27bc80c7910407cc",
 *                           "643efcbdf8f79921bd42a1f4",
 *                           "643f545c204a18cbfcd936cc"
 *                       ],
 *                       "arrAudioChannels": [
 *                           "643ed78a88486d6dd59d7be5",
 *                           "643f8ed65865f04f90d29514"
 *                       ],
 *                       "__v": 7
 *                       }
 *                       ],
 *                       "arrFriends": [
 *                           "643af5d692b9f9f15fb1544b"
 *                       ],
 *                       "arrRequestsSent": [
 *                           "643b678619262fca193b0fb2",
 *                           "643b67ef19262fca193b0fbc",
 *                           "643c82f7d2e1ff38399dcc36",
 *                           "643c86b7b8ca456b01854cca"
 *                       ],
 *                       "arrRequestsReceived": [
 *                           "643c9cd97963286ff4f67f08"
 *                       ],
 *                       "arrDirectMessages": [
 *                           "643c832ed2e1ff38399dcc3b"
 *                       ],
 *                       "__v": 0,
 *                       "image": "no image"
 *                   }
 *      404:
 *        description: No se encontro el usuario con el id idUSer
 */


router.get('/:idUser/friends',usersController.loadFriends);
/**
 * @swagger
 * /users/{idUser}/friends:
 *  get:
 *    tags:
 *      - User
 *    description: obtener el arreglo de amigos poblado
 *    parameters:
 *      - in: path
 *        name: idUser
 *        description: id del usuario que inicio sesión
 *        schema:
 *          type: string
 * 
 *    responses:
 *      200:
 *        description: arreglo de amigos regresado
 *        schema:
 *          example:
 *              [
 *                  {
 *                      "_id": "643af5d692b9f9f15fb1544b",
 *                      "name": "Usuario precargado2",
 *                      "email": "otro2@test.com",
 *                      "password": "password",
 *                      "token": "undefined",
 *                      "arrGroups": [],
 *                      "arrFriends": [
 *                      "643aed8b64f01a772cb50353"
 *                      ],
 *                      "arrRequestsSent": [],
 *                      "arrRequestsReceived": [
 *                      "643b678619262fca193b0fb2",
 *                      "643b67ef19262fca193b0fbc",
 *                      "643c82f7d2e1ff38399dcc36"
 *                      ],
 *                      "arrDirectMessages": [
 *                      "643c832ed2e1ff38399dcc3b"
 *                      ],
 *                      "__v": 0
 *                  }
 *              ]
 *      404:
 *        description: No se encontro el usuario con el id idUSer
 */

router.get('/:idUser/friends/:idFriend',usersController.loadChannel);
/**
 * @swagger
 * /users/{idUser}/friends/{idFriend}:
 *  get:
 *    tags:
 *      - User
 *    description: obtener el canal de texto con el amigo indicado
 *    parameters:
 *      - in: path
 *        name: idUser
 *        description: id del usuario que inicio sesión
 *        schema:
 *          type: string
 * 
 *      - in: path
 *        name: idFriend
 *        description: id del usuario amigo del que se quiere obtener el chat 
 *        schema:
 *          type: string
 * 
 *    responses:
 *      200:
 *        description: chat de mensaje directo recuperado
 *        schema:
 *          example:
 *              {
 *              "_id": "643c832ed2e1ff38399dcc3b",
 *              "title": "DM Cambio y Usuario precargado2",
 *              "arrMembers": [
 *                  {
 *                  "_id": "643aed8b64f01a772cb50353",
 *                  "name": "Cambio",
 *                  "email": "otro1@test.com",
 *                  "password": "password",
 *                  "token": "undefined",
 *                  "arrGroups": [],
 *                  "arrFriends": [
 *                      "643af5d692b9f9f15fb1544b",
 *                      "643b02446664b9a3efbf1e60"
 *                  ],
 *                  "arrRequestsSent": [
 *                      "643b678619262fca193b0fb2",
 *                      "643b67ef19262fca193b0fbc"
 *                  ],
 *                  "arrRequestsReceived": [],
 *                  "arrDirectMessages": [
 *                      "643c832ed2e1ff38399dcc3b",
 *                      "643c86ceb8ca456b01854ccf"
 *                  ],
 *                  "__v": 0
 *                  },
 *                  {
 *                  "_id": "643af5d692b9f9f15fb1544b",
 *                  "name": "Usuario precargado2",
 *                  "email": "otro2@test.com",
 *                  "password": "password",
 *                  "token": "undefined",
 *                  "arrGroups": [],
 *                  "arrFriends": [
 *                      "643aed8b64f01a772cb50353"
 *                  ],
 *                  "arrRequestsSent": [],
 *                  "arrRequestsReceived": [
 *                      "643b678619262fca193b0fb2",
 *                      "643b67ef19262fca193b0fbc"
 *                  ],
 *                  "arrDirectMessages": [
 *                      "643c832ed2e1ff38399dcc3b"
 *                  ],
 *                  "__v": 0
 *                  }
 *              ],
 *              "private": false,
 *              "arrMessages": [
 *                  {
 *                  "_id": "643c8ed13daee7ca7c75f99b",
 *                  "sender": "Cambio",
 *                  "content": "mensajes",
 *                  "idChannel": "643c832ed2e1ff38399dcc3b",
 *                  "dateTime": "2023-04-17T00:12:01.097Z",
 *                  "__v": 0
 *                  },
 *                  {
 *                  "_id": "643c8edd3daee7ca7c75f99e",
 *                  "sender": "Cambio",
 *                  "content": "222",
 *                  "idChannel": "643c832ed2e1ff38399dcc3b",
 *                  "dateTime": "2023-04-17T00:12:13.390Z",
 *                  "__v": 0
 *                  }
 *              ],
 *              "__v": 0
 *              }
 *      404:
 *        description: No se encontro el usuario con el id idUSer
 *      400:
 *        description: Error al cargar los datos
 */


router.post('/:idUser/friends/:idChannel/send',express.json(),usersController.sendDM);
/**
 * @swagger
 * /users/{idUser}/friends/{idChannel}/send:
 *  post:
 *    tags:
 *      - User
 *    description: Enviar un mensaje en un canal de texto creado para un amigo
 *    parameters:
 *      - in: path
 *        name: idUser
 *        description: id del usuario que inició sesión
 *        schema:
 *          type: string
 * 
 *      - in: path
 *        name: idChannel
 *        description: canal de mensaje directo al que se agregó un mensaje
 *        schema:
 *          type: string
 * 
 *      - in: body
 *        name: bodyInfo
 *        description: objeto información de usuario e informacion del mensaje
 *        schema:
 *          type: object
 *          example: 
 *            {
 *                "UserInfo": {
 *                    "idUser": "6420ab210db1252132a4a328",
 *                    "token": "Undefined"
 *                },
 *                "messageInfo": {
 *                    "content": "23"
 *                    }
 *            }
 * 
 *    responses:
 *      200:
 *        description: Se mando exitosamente el mensaje
 * 
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
 *    description: se cambia el password del usuario
 *    parameters:
 *      - in: path
 *        name: idUser
 *        description: id del usuario a obtener
 *        schema:
 *          type: string
 * 
 *      - in: body
 *        name: name
 *        description: pasword del usuario a cambiar
 *        schema:
 *          type: object
 *          example: 
 *            {"password":"cambiopassword" } 
 *    responses:
 *      200:
 *        description: mensaje se actualizó el usuario y su password nuevo
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