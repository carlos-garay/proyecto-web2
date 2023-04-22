const express = require('express')
const router = express.Router({mergeParams: true})
const audioChannelController = require('../controllers/audioChannels')

router.post('/',express.json(),audioChannelController.createAudioChannel);
/**
 * @swagger
 * /groups/{idGroup}/audioChannels:
 *  post:
 *    tags:
 *      - audioChannels
 *    description: crear un nuevo canal de audio 
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: el id del grupo donde vamos a crear el canal
 *        schema:
 *          type: string
 * 
 *    responses:
 *      200:
 *        description:objeto del canal de audio que se creó
 *      404: 
 *        description: no se encontro el grupo con ese id 
 *      500: 
 *        description: error en el servidor 
 */



router.put('/:idChannel/addMember',express.json(),audioChannelController.addMemberToAudioChannel);
/**
 * @swagger
 * /groups/{idGroup}/audioChannels/{idChannel}/addMember:
 *  put:
 *    tags:
 *      - audioChannels
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
 *        description: id del canal de audio al que se le agregara el miembro
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
 *    responses:
 *      200:
 *        description: objeto del usuario que se agregó al canal de audio
 *      404:
 *        description: No se encontró el canal con el id idChannel
 */


router.put('/:idChannel/removeMember',express.json(),audioChannelController.removeMemberFromAudioChannel);
/**
 * @swagger
 * /groups/{idGroup}/audioChannels/{idChannel}/removeMember:
 *  put:
 *    tags:
 *      - audioChannels
 *    description: eliminar un usuario del arreglo del canal
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: el id del grupo al que pertenece el canal
 *        schema:
 *          type: string
 *      - in: path
 *        name: idChannel
 *        description: el id del canal donde eliminaremos al miembro
 *        schema:
 *          type: string
 *      - in: body
 *        name: email
 *        description: email del usuario a eliminar del canal
 *        schema:
 *          type: object
 *          example:
 *            { "email": "otro1@test.com"}
 *    responses:
 *      200:
 *        description: objeto del usuario que se eliminó del canal de audio
 *      404: 
 *        description: no se encontro el grupo con ese id 
 */

router.delete('/:idChannel',audioChannelController.deleteAudioChannel);
/**
 * @swagger
 * /groups/{idGroup}/audioChannels/{idChannel}:
 *  delete:
 *    tags:
 *      - audioChannels
 *    description: borrar un canal de audio 
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: el id del grupo al que pertenece el canal
 *        schema:
 *          type: string
 *      - in: path
 *        name: idChannel
 *        description: el id del canal que vamos a borrar
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: objeto del canal de audio que se eliminó
 *      404: 
 *        description: no se encontro el grupo con ese id 
 */



router.put('/:idChannel/enterCall',express.json(),audioChannelController.enterCall);
/**
 * @swagger
 * /groups/{idGroup}/audioChannels/{idChannel}/enterCall:
 *  put:
 *    tags:
 *      - audioChannels
 *    description: Añadimos un miembro a una llamada
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: id del grupo al que pertenece el canal
 *        schema:
 *          type: string
 * 
 *      - in: path
 *        name: idChannel
 *        description: id del canal de audio al que se agrega un usuario a la llamada
 *        schema:
 *          type: string
 * 
 * 
 *      - in: body
 *        name: idUser
 *        description: id del usuario a añadir a la llamada
 *        schema:
 *          type: object
 *          example:
 *            { "idUser": "643aed8b64f01a772cb50353"}
 * 
 *    responses:
 *      200:
 *        description: objeto del canal de audio
 *      404:
 *        description: No se encontró el canal con el id idChannel
 */


router.put('/:idChannel/exitCall',express.json(),audioChannelController.exitCall);
/**
 * @swagger
 * /groups/{idGroup}/audioChannels/{idChannel}/exitCall:
 *  put:
 *    tags:
 *      - audioChannels
 *    description: Sacamos a un miembro de una llamada
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: id del grupo al que pertenece el canal
 *        schema:
 *          type: string
 * 
 *      - in: path
 *        name: idChannel
 *        description: id del canal de audio al que se saca al usuario a la llamada
 *        schema:
 *          type: string
 * 
 * 
 *      - in: body
 *        name: idUser
 *        description: id del usuario a sacar de la llamada
 *        schema:
 *          type: object
 *          example:
 *            { "idUser": "643aed8b64f01a772cb50353"}
 * 
 *    responses:
 *      200:
 *        description: objeto del canal de audio
 *      404:
 *        description: No se encontró el canal con el id idChannel
 */


router.put('/:idChannel/name',express.json(),audioChannelController.changeChannelName);

/**
 * @swagger
 * /groups/{idGroup}/audioChannels/{idChannel}/name:
 *  put:
 *    tags:
 *      - audioChannels
 *    description: cambiar nombre a un canal de audio
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
 *        description: objeto del canal de audio que se actualizó
 *
 *      400: 
 *        description: no pudo cambiarse el nombre
 * 
 *      401: 
 *        description: no eres administrador por lo tanto no puedes cambiar el nombre
 *      
 *      404:
 *        description: no se encontro al grupo o canal 
 */

module.exports = router