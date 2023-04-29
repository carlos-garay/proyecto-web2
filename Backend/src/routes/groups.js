const express = require('express')
const router = express.Router({mergeParams: true})
const groupsController = require('../controllers/groups')
const auth = require('../middlewares/auth')


//rutas de channels
const rutasChannels = require('./channels')
router.use('/:idGroup/channels',rutasChannels)
//rutas de audiochannels 
const rutasAudioChannels = require('./audioChannel')
router.use('/:idGroup/audioChannels',rutasAudioChannels)

//endpoints

router.post('/',auth,express.json(),groupsController.createGroup)
/**
 * @swagger
 * /groups:
 *  post:
 *    tags:
 *      - groups
 *    description: crear un grupo y añadir al usuario que lo crea como admin
 *    parameters:
 * 
 *      - in: header
 *        name: token
 *        description: el token del usuario actual
 * 
 *      - in: body
 *        name: bodyInfo
 *        description: objeto información de usuario e informacion del grupo con titulo e imagen
 *        schema:
 *          type: object
 *          example: 
 *              {
 *               "UserInfo": {
 *                  "idUser": "6420aafe0db1252132a4a322",
 *                  "token": "Undefined"
 *              },
 *              "groupInfo": {
 *                  "title": "grupo1"
 *                  }
 *              }
 *    responses:
 *      200:
 *        description: el usuario ha creado el grupo exitosamente
 *      401:
 *        description: token invalido
 *      400: 
 *        description: no pudo crearse el nuevo grupo 
 */


router.delete('/:idGroup',auth,groupsController.deleteGroup)
/**
 * @swagger
 * /groups/{idGroup}:
 *  delete:
 *    tags:
 *      - groups
 *    description: eliminar el grupo, eliminarlo del arreglo de los usuarios, eliminar todos los canales y mensajes incluidos
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: el id del grupo que queremos borrar 
 *        schema:
 *          type: string
 *      - in: header
 *        name: user
 *        description: el id del usuario intentando hacer la acción
 * 
 *      - in: header
 *        name: token
 *        description: el token del usuario actual
 * 
 *    responses:
 *      200:
 *        description: objeto del grupo eliminado
 *      400: 
 *        description: no se pudo borrar el grupo 
 *      401:
 *        description: token invalido
 *      404: 
 *        description: no se encontro el grupo
 *      403:
 *        description: no tienes permisos para borrar el grupo
 */

router.put('/:idGroup',auth,express.json(),groupsController.addUserToGroup) //el body va a traer el user que quieres agregar 
/**
 * @swagger
 * /groups/{idGroup}:
 *  put:
 *    tags:
 *      - groups
 *    description: agregar un usuario al grupo 
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: el id del grupo al que se le agregará un miembro
 *        schema:
 *          type: string
 *      - in: header
 *        name: user
 *        description: El id del usuario que está intentando hacer la acción 
 * 
 *      - in: header
 *        name: token
 *        description: el token del usuario actual
 * 
 *      - in: body
 *        name: email
 *        description: objeto que contiene el correo del user que queremos agregar
 *        schema:
 *          type: object
 *          example:
 *            {
 *              "email":"otro3@test.com"
 *            }
 *    responses:
 *      200:
 *        description: objeto del usuario que se agregó al grupo
 *      400: 
 *        description: no se pudo agregar al grupo
 *      401:
 *        description: token invalido
 *      403:
 *        description: no eres administrador del grupo
 */



router.put('/:idGroup/remove',auth,express.json(),groupsController.removeUserFromGroup) //el body va a traer el user que quieres agregar 
/**
 * @swagger
 * /groups/{idGroup}/remove:
 *  put:
 *    tags:
 *      - groups
 *    description: sacar a un usuario del grupo 
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: el id del grupo donde se sacará al usuario
 *        schema:
 *          type: string
 *      - in: header
 *        name: user
 *        description: el id del usuario que está intentando hacer la acción
 * 
 *      - in: header
 *        name: token
 *        description: el token del usuario actual
 * 
 *      - in: body
 *        name: email
 *        description: objeto que contiene el correo del user que queremos sacar del grupo
 *        schema:
 *          type: object
 *          example:
 *            {
 *              "email":"otro3@test.com"
 *            }
 *    responses:
 *      200:
 *        description: objeto del usuario que fue sacado del grupo
 *      400: 
 *        description: no se pudo eliminar el usuario del grupo
 *      401:
 *        description: token invalido
 *      403:
 *        description: no eres administrador del grupo
 *      500:
 *        description: error al actualizar datos en las colecciones
 *      404:
 *        description: no se encontro el grupo, canal o usuario
 */




router.put('/:idGroup/makeAdmin',auth,express.json(),groupsController.makeUserAdmin) 
/**
 * @swagger
 * /groups/{idGroup}/makeAdmin:
 *  put:
 *    tags:
 *      - groups
 *    description: hacer un usuario un administrador del grupo
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: el id del grupo en el que está el usuario a hacer admin
 *        schema:
 *          type: string
 *      - in: header
 *        name: user
 *        description: El id del usuario que está intentando hacer la acción 
 * 
 *      - in: header
 *        name: token
 *        description: el token del usuario actual
 * 
 *      - in: body
 *        name: idUser
 *        description: objeto que contiene el id del user que queremos hacer admin
 *        schema:
 *          type: object
 *          example:
 *            {
 *              "_id":"643aed8b64f01a772cb50353"
 *            }
 *    responses:
 *      200:
 *        description: el usuario se ha agregado a la lista de administradores
 *      400: 
 *        description: no se pudo revocar permisos de administrador
 *      401:
 *        description: token invalido
 *      403:
 *        description: no eres administrador del grupo
 *      404:
 *        description: no se encontro al grupo o al usuario
 *      500:
 *        description: error al quitar al usuario del arreglo de admins
 */


router.put('/:idGroup/revokeAdmin',auth,express.json(),groupsController.revokeUserAdmin) 
/**
 * @swagger
 * /groups/{idGroup}/revokeAdmin:
 *  put:
 *    tags:
 *      - groups
 *    description: quitar permiso de administrador a un usuario del grupo
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: el id del grupo en el que está el usuario a quitar de la lista de admins
 *        schema:
 *          type: string
 *      - in: header
 *        name: user
 *        description: El id del usuario que está intentando hacer la acción 
 * 
 *      - in: header
 *        name: token
 *        description: el token del usuario actual
 * 
 *      - in: body
 *        name: idUser
 *        description: objeto que contiene el id del user al que queremos quitar de la lista de admins
 *        schema:
 *          type: object
 *          example:
 *            {
 *              "_id":"643aed8b64f01a772cb50353"
 *            }
 *    responses:
 *      200:
 *        description: el usuario se ha eliminado de la lista de administradores
 *      400: 
 *        description: no se pudo volver administrador
 *      401:
 *        description: token invalido
 *      403:
 *        description: no eres administrador del grupo
 *      404:
 *        description: no se encontro al grupo o al usuario
 *      500:
 *        description: error al hacer al usuario admin
 */


router.get('/:idGroup',auth,groupsController.getGroup) //traer todo lo de ese grupo, usamos populate 

/**
 * @swagger
 * /groups/{idGroup}:
 *  get:
 *    tags:
 *      - groups
 *    description: recuperar la información de un grupo, incluyendo miembros, canales, etc. 
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: el id del grupo que queremos recuperar 
 *        schema:
 *          type: string
 *      - in: header
 *        name: user
 *        description: id del usuario que inició sesión
 *        schema:
 *          type: string
 * 
 *      - in: header
 *        name: token
 *        description: el token del usuario actual
 * 
 *    responses:
 *      200:
 *        description: objeto que contiene grupo con sus arreglos poblados con los objetos correspondientes
 *        schema:
 *          example:
 *              {
 *                  "_id": "643b6d6f23cf96aafcebfb06",
 *                  "title": "grupo1",
 *                  "image": "noimage",
 *                  "arrUsers": [
 *                      {
 *                      "_id": "643aed8b64f01a772cb50353",
 *                      "name": "Cambio",
 *                      "email": "otro1@test.com",
 *                      "password": "password",
 *                      "token": "undefined",
 *                      "arrGroups": [
 *                          "643b6d6f23cf96aafcebfb06"
 *                      ],
 *                      "arrFriends": [],
 *                      "arrRequestsSent": [
 *                          "643b678619262fca193b0fb2",
 *                          "643b67ef19262fca193b0fbc"
 *                      ],
 *                      "arrRequestsReceived": [],
 *                      "arrDirectMessages": [],
 *                      "__v": 0
 *                      }
 *                  ],
 *                  "arrAdmins": [
 *                      {
 *                      "_id": "643aed8b64f01a772cb50353",
 *                      "name": "Cambio",
 *                      "email": "otro1@test.com",
 *                      "password": "password",
 *                      "token": "undefined",
 *                      "arrGroups": [
 *                          "643b6d6f23cf96aafcebfb06"
 *                      ],
 *                      "arrFriends": [],
 *                      "arrRequestsSent": [
 *                          "643b678619262fca193b0fb2",
 *                          "643b67ef19262fca193b0fbc"
 *                      ],
 *                      "arrRequestsReceived": [],
 *                      "arrDirectMessages": [],
 *                      "__v": 0
 *                      }
 *                  ],
 *                  "arrChannels": [
 *                      {
 *                      "_id": "643b898e18c959b67911bae3",
 *                      "title": "Nuevo canal",
 *                      "arrMembers": [
 *                          "643aed8b64f01a772cb50353",
 *                          "643af5d692b9f9f15fb1544b",
 *                          "643b02446664b9a3efbf1e60"
 *                      ],
 *                      "private": false,
 *                      "arrMessages": [
 *                          "643b917ac9b3d494bcb9cfe3",
 *                          "643b9195c9b3d494bcb9cfe6"
 *                      ],
 *                      "__v": 0
 *                      }
 *                  ],
 *                  "arrAudioChannels": [
 *                      {
 *                      "_id": "643b8cb186388eeae83cec80",
 *                      "title": "nuevo canal de audio",
 *                      "arrMembers": [
 *                          "643aed8b64f01a772cb50353",
 *                          "643af5d692b9f9f15fb1544b"
 *                      ],
 *                      "private": false,
 *                      "__v": 0
 *                      }
 *                  ],
 *                  "__v": 0
 *              }
 *      401:
 *        description: token invalido
 *      404: 
 *        description: no se encontro ese grupo 
 */

router.put('/:idGroup/name',auth,express.json(),groupsController.changeGroupName) // el body va a traer un atribuo llamado nombreGrupo

/**
 * @swagger
 * /groups/{idGroup}/name:
 *  put:
 *    tags:
 *      - groups
 *    description: cambiar nombre a un grupo
 * 
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: el id del grupo al que queremos cambiar su nombre 
 *        schema:
 *          type: string
 * 
 *      - in: header
 *        name: token
 *        description: el token del usuario actual
 *
 *      - in: body
 *        name: bodyInfo
 *        description: objeto información de usuario e informacion del grupo con titulo e imagen
 *        schema:
 *          type: object
 *          example: 
 *              {
 *               "UserInfo": {
 *                  "idUser": "643aed8b64f01a772cb50353",
 *                  "token": "Undefined"
 *              },
 *              "groupInfo": {
 *                  "title": "cambio"
 *                  }
 *              }
 *    responses:
 *      200:
 *        description: objeto del grupo al que se le cambió el nombre
 *
 *      400: 
 *        description: no pudo cambiarse el nombre
 *      401:
 *        description: token invalido
 *      403: 
 *        description: no eres administrador por lo tanto no puedes cambiar el nombre
 *      
 *      404:
 *        description: no se encontró al grupo 
 */




module.exports = router