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

module.exports = router