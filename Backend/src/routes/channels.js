const express = require('express')
const router = express.Router({mergeParams: true})
const channelsController = require('../controllers/channels')
const auth = require('../middlewares/auth')

//incluir rutas de mensajes
const rutasMessages = require('./messages')

router.use('/:idChannel/messages',rutasMessages);

router.get('/:idChannel',auth,channelsController.getMessages);
/**
 * @swagger
 * /groups/{idGroup}/channels/{idChannel}:
 *  get:
 *    tags:
 *      - Channel
 *    description: Obtenemos todos los mensajes de este canal
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: id del grupo al que pertenece el canal
 *        schema:
 *          type: string
 * 
 *      - in: path
 *        name: idChannel
 *        description: id del canal al cual mostrar los mensajes
 *        schema:
 *          type: string
 *      - in: header
 *        name: user
 *        description: id del usuario que quiere realizar la acción
 * 
 *      - in: header
 *        name: token
 *        description: el token del usuario actual
 * 
 *    responses:
 *      200:
 *        description: objeto del channel con los mensajes poblados 
 *        schema:
 *            example:
 *                 {
 *                      "_id": "643b898e18c959b67911bae3",
 *                      "title": "Nuevo canal",
 *                      "arrMembers": [
 *                          {
 *                          "_id": "643aed8b64f01a772cb50353",
 *                          "name": "Cambio",
 *                          "email": "otro1@test.com",
 *                          "password": "password",
 *                          "token": "undefined",
 *                          "arrGroups": [
 *                              "643b6d6f23cf96aafcebfb06"
 *                          ],
 *                          "arrFriends": [],
 *                          "arrRequestsSent": [
 *                              "643b678619262fca193b0fb2",
 *                              "643b67ef19262fca193b0fbc"
 *                          ],
 *                          "arrRequestsReceived": [],
 *                          "arrDirectMessages": [],
 *                          "__v": 0
 *                          }
 *                      ],
 *                      "private": false,
 *                      "arrMessages": [
 *                          {
 *                          "_id": "643b917ac9b3d494bcb9cfe3",
 *                          "sender": "Cambio",
 *                          "content": "111",
 *                          "idChannel": "643b898e18c959b67911bae3",
 *                          "dateTime": "2023-04-16T06:11:06.419Z",
 *                          "__v": 0
 *                          },
 *                          {
 *                          "_id": "643b9195c9b3d494bcb9cfe6",
 *                          "sender": "Usuario precargado2",
 *                          "content": "111",
 *                          "idChannel": "643b898e18c959b67911bae3",
 *                          "dateTime": "2023-04-16T06:11:33.915Z",
 *                          "__v": 0
 *                          }
 *                      ],
 *                      "__v": 0
 *                  }
 *      401:
 *        description: token invalido
 * 
 *      404:
 *        description: Error al obtener datos del canal con el id idChannel
 */


router.post('/',auth,express.json(),channelsController.createChannel);
/**
 * @swagger
 * /groups/{idGroup}/channels:
 *  post:
 *    tags:
 *      - Channel
 *    description: creamos un nuevo canal de texto
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: id del grupo al que pertenece el canal
 *        schema:
 *          type: string
 * 
 *      - in: header
 *        name: user
 *        description: id del usuario que quiere realizar la acción 
 * 
 *      - in: header
 *        name: token
 *        description: el token del usuario actual 
 * 
 *    responses:
 *      200:
 *        description: objeto del canal creado
 * 
 *      401:
 *        description: token invalido
 *      403:
 *        description: No eres administrador del grupo
 *      404:
 *        description: No se encontró el grupo con el id idGrupo
 *      500: 
 *        description: Error en el servidor
 */


router.put('/:idChannel/addMember',auth,express.json(),channelsController.addMemberToChannel);
/**
 * @swagger
 * /groups/{idGroup}/channels/{idChannel}/addMember:
 *  put:
 *    tags:
 *      - Channel
 *    description: Añadimos un miembro al canal
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: id del grupo al que pertenece el canal
 *        schema:
 *          type: string
 * 
 *      - in: path
 *        name: idChannel
 *        description: id del canal al que se le agregara el miembro
 *        schema:
 *          type: string
 * 
 * 
 *      - in: body
 *        name: email
 *        description: email del usuario a añadir
 *        schema:
 *          type: object
 *          example:
 *            { "email": "otro1@test.com"}
 * 
 *      - in: header
 *        name: user
 *        description: id del usuario que quiere realizar al acción
 * 
 *      - in: header
 *        name: token
 *        description: el token del usuario actual
 * 
 *    responses:
 *      200:
 *        description: objeto del usuario que se agrego al canal
 * 
 *      401:
 *        description: token invalido
 *      404:
 *        description: No se encontró el canal con el id idChannel
 *      403: 
 *        description: No eres administrador del grupo
 */



router.put('/:idChannel/removeMember',auth,express.json(),channelsController.removeMemberFromChannel);
/**
 * @swagger
 * /groups/{idGroup}/channels/{idChannel}/removeMember:
 *  put:
 *    tags:
 *      - Channel
 *    description: Quitamos un miembro del canal
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: id del grupo al que pertenece el canal
 *        schema:
 *          type: string
 * 
 *      - in: path
 *        name: idChannel
 *        description: id del canal al que se le quitaran miembros
 *        schema:
 *          type: string
 * 
 *      - in: body
 *        name: email
 *        description: email del usuario que sacaramos del canal
 *        schema:
 *          type: object
 *          example:
 *            { "email": "otro1@test.com"}
 * 
 *      - in: header
 *        name: user
 *        description: id del usuario que quiere realizar al acción
 * 
 *      - in: header
 *        name: token
 *        description: el token del usuario actual
 * 
 * 
 *    responses:
 *      200:
 *        description: objeto del usuario que se eliminó del canal
 *      401:
 *        description: token invalido
 *      403:
 *        description: no eres administrador del grupo
 *      404:
 *        description: No se encontró el canal con el id idChannel
 */



router.delete('/:idChannel',auth,channelsController.deleteChannel);
/**
 * @swagger
 * /groups/{idGroup}/channels/{idChannel}:
 *  delete:
 *    tags:
 *      - Channel
 *    description: Eliminamos el canal y los mensajes asociados a este
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: id del grupo al que pertenece el canal
 *        schema:
 *          type: string
 * 
 *      - in: path
 *        name: idChannel
 *        description: id del canal que se va a eliminar
 *        schema:
 *          type: string
 * 
 *      - in: header
 *        name: user
 *        description: id del usuario que quiere realizar la acción
 *          
 *      - in: header
 *        name: token
 *        description: el token del usuario actual
 * 
 *    responses:
 *      200:
 *        description: objeto del canal que se eliminó
 *      401:
 *        description: token invalido
 *      404:
 *        description: No se encontró el canal con el id idChannel
 *      403:
 *        description: no eres administrador del grupo
 *      400:
 *        description: error al eliminar los mensajes del canal
 */

router.put('/:idChannel/name',auth,express.json(),channelsController.changeChannelName);

/**
 * @swagger
 * /groups/{idGroup}/channels/{idChannel}/name:
 *  put:
 *    tags:
 *      - Channel
 *    description: cambiar nombre a un canal
 * 
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: el id del grupo al que pertenece el canal a cambiar el nombre 
 *        schema:
 *          type: string
 * 
 *      - in: path
 *        name: idChannel
 *        description: el id del canal al que queremos cambiar el nombre 
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
 *              "channelInfo": {
 *                  "title": "cambio"
 *                  }
 *              }
 *    responses:
 *      200:
 *        description: objeto del canal que cambió de nombre
 * 
 *      401:
 *        description: token invalido
 * 
 *      400: 
 *        description: no pudo cambiarse el nombre
 * 
 *      403: 
 *        description: no eres administrador por lo tanto no puedes cambiar el nombre
 *      
 *      404:
 *        description: no se encontro al grupo 
 */



module.exports = router