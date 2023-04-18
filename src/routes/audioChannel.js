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
 *      - in: body
 *        name: arrUsers
 *        description: objeto que contiene arreglo con los miembros iniciales
 *        schema:
 *          type: object
 *          example:
 *            {"arrMembers": ["6420ab1a0db1252132a4a326", "6420ab0f0db1252132a4a324"]}
 *    responses:
 *      200:
 *        description: se agrego el canal de audio 
 *      404: 
 *        description: no se encontro el grupo con ese id 
 *      500: 
 *        description: eror en el servidor 
 */



router.put('/:idChannel/addMember',express.json(),audioChannelController.addMemberToAudioChannel);
/**
 * @swagger
 * /groups/{idGroup}/audioChannels/{idChannel}/addMember:
 *  put:
 *    tags:
 *      - audioChannels
 *    description: agregar los usuarios del arreglo al canal
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: el id del grupo al que pertenece el canal
 *        schema:
 *          type: string
 *      - in: path
 *        name: idChannel
 *        description: el id del canal donde agregaremos el miembro
 *        schema:
 *          type: string
 *      - in: body
 *        name: arrUsers
 *        description: objeto que contiene arreglo con los usuarios a agregar
 *        schema:
 *          type: object
 *          example:
 *            {"arrMembers": ["6420ab1a0db1252132a4a326", "6420ab0f0db1252132a4a324"]}
 *    responses:
 *      200:
 *        description: se agregaron los miembros al canal
 *      404: 
 *        description: no se encontro el grupo con ese id 
 */

router.put('/:idChannel/removeMember',express.json(),audioChannelController.removeMemberFromAudioChannel);
/**
 * @swagger
 * /groups/{idGroup}/audioChannels/{idChannel}/removeMember:
 *  put:
 *    tags:
 *      - audioChannels
 *    description: eliminar los usuarios del arreglo del canal
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: el id del grupo al que pertenece el canal
 *        schema:
 *          type: string
 *      - in: path
 *        name: idChannel
 *        description: el id del canal donde agregaremos el miembro
 *        schema:
 *          type: string
 *      - in: body
 *        name: arrUsers
 *        description: objeto que contiene arreglo con los usuarios a agregar
 *        schema:
 *          type: object
 *          example:
 *            { "arrMembers": ["641d38e610683da2e7cca8a4","641d38fb10683da2e7cca8a6"]}
 *    responses:
 *      200:
 *        description: se eliminaron los miembros del canal
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
 *        description: se elimino el canal de audio
 *      404: 
 *        description: no se encontro el grupo con ese id 
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
 *        description: se ha cambiado el nombre del canal exitosamente
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