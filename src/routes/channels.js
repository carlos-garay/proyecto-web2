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
 *        description: objeto del channel con los mensajes populados 
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
 *    description: Obtenemos todos los mensajes de este canal
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
 * 
 * 
 *    responses:
 *      200:
 *        description: se agrego el canal idChannel al grupo group.title
 *      404:
 *        description: No se encontró el grupo con el id idGrupo
 *      500: 
 *        Error en el servidor
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
 *        description: id del canal al que se le quitaran miembros
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