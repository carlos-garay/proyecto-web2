const express = require('express')
const router = express.Router({mergeParams: true})
const channelsController = require('../controllers/channels')

//incluir rutas de mensajes
const rutasMessages = require('./messages')

router.use('/:idChannel/messages',rutasMessages);

router.get('/:idChannel',channelsController.getMessages);
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
 *      404:
 *        description: Error al obtener datos del canal con el id idChannel
 */


router.post('/',express.json(),channelsController.createChannel);
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
 *      - in: body
 *        name: arrMembers
 *        description: arreglo con los ids de los miembros que perteneceran al canal
 *        schema:
 *          type: object
 *          example:
 *              {  
 *               "arrMembers": ["6420ab210db1252132a4a328", "6420ab0f0db1252132a4a324","6420ab1a0db1252132a4a326"]
 *              }
 * 
 * 
 *    responses:
 *      200:
 *        description: se agrego el canal idChannel al grupo group.title
 *      404:
 *        description: No se encontró el grupo con el id idGrupo
 *      500: 
 *        description: Error en el servidor
 */




router.put('/:idChannel/addMember',express.json(),channelsController.addMemberToChannel);
/**
 * @swagger
 * /groups/{idGroup}/channels/{idChannel}/addMember:
 *  put:
 *    tags:
 *      - Channel
 *    description: Añadimos miembros al canal
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: id del grupo al que pertenece el canal
 *        schema:
 *          type: string
 * 
 *      - in: path
 *        name: idChannel
 *        description: id del canal al que se le agregaran miembros
 *        schema:
 *          type: string
 * 
 * 
 *      - in: body
 *        name: arrMembers
 *        description: arreglo con los ids de los miembros que agregaremos
 *        schema:
 *          type: object
 *          example:
 *            { "arrMembers": ["641e54b50d597f66c48a7fa7","641e54bb0d597f66c48a7fa9"]}
 * 
 *    responses:
 *      200:
 *        description: se agregaron los miembros al canal idChannel del grupo idGroup
 *      404:
 *        description: No se encontró el canal con el id idChannel
 */



router.put('/:idChannel/removeMember',express.json(),channelsController.removeMemberFromChannel);
/**
 * @swagger
 * /groups/{idGroup}/channels/{idChannel}/removeMember:
 *  put:
 *    tags:
 *      - Channel
 *    description: Quitamos miembros del canal
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
 *        name: arrMembers
 *        description: arreglo con los ids de los miembros que quitaremos
 *        schema:
 *          type: object
 *          example:
 *            { "arrMembers": ["641e54b50d597f66c48a7fa7","641e54bb0d597f66c48a7fa9"]}
 * 
 *    responses:
 *      200:
 *        description: se eliminaron los miembros al canal idChannel del grupo idGroup
 *      404:
 *        description: No se encontró el canal con el id idChannel
 */



router.delete('/:idChannel',channelsController.deleteChannel);
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
 * 
 *    responses:
 *      200:
 *        description: se eliminó el canal idChannel
 *      404:
 *        description: No se encontró el canal con el id idChannel
 *      400:
 *        description: error al eliminar los mensajes del canal
 */



module.exports = router