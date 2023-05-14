const express = require('express')
const router = express.Router({mergeParams: true})
const audioChannelController = require('../controllers/audioChannels')
const auth = require('../middlewares/auth')

router.post('/',auth,express.json(),audioChannelController.createAudioChannel);
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
 *      - in: header
 *        name: user
 *        description: id del usuario que quiere realizar la acción 
 * 
 *      - in: header
 *        name: token
 *        description: el token del usuario actual
 * 
 * 
 *    responses:
 *      200:
 *        description: objeto del canal de audio que se creó
 *      401:
 *        description: token invalido
 *      403:
 *        description: no eres administrador del grupo
 *      404: 
 *        description: no se encontro el grupo con ese id 
 *      500: 
 *        description: error en el servidor 
 */



router.put('/:idChannel/addMember',auth,express.json(),audioChannelController.addMemberToAudioChannel);
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
 *      - in: header
 *        name: token
 *        description: el token del usuario actual
 *
 *      - in: header
 *        name: user
 *        description: id del usuario que quiere realizar al acción
 * 
 *      - in: body
 *        name: email
 *        description: email del usuario a añadir
 *        schema:
 *          type: object
 *          example:
 *            { "email": "otro1@test.com"}
 * 
 *
 * 
 *    responses:
 *      200:
 *        description: objeto del usuario que se agregó al canal de audio
 *      401:
 *        description: token invalido
 *      403:
 *        description: no eres administrador del grupo
 *      404:
 *        description: No se encontró el canal con el id idChannel
 */


router.put('/:idChannel/removeMember',auth,express.json(),audioChannelController.removeMemberFromAudioChannel);
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
 * 
 *      - in: header
 *        name: user
 *        description: id del usuario que quiere realizar al acción
 * 
 *      - in: header
 *        name: token
 *        description: el token del usuario actual
 * 
 *      - in: body
 *        name: email
 *        description: email del usuario a eliminar del canal
 *        schema:
 *          type: object
 *          example:
 *            { "email": "otro1@test.com"}
 * 
 * 
 *    responses:
 *      200:
 *        description: objeto del usuario que se eliminó del canal de audio
 *      401:
 *        description: token invalido
 *      403:
 *        description: no eres administrador del grupo
 *      404: 
 *        description: no se encontro el grupo con ese id 
 */

router.delete('/:idChannel',auth,audioChannelController.deleteAudioChannel);
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
 *        description: objeto del canal de audio que se eliminó
 *      401:
 *        description: token invalido
 *      404: 
 *        description: no se encontro el grupo con ese id 
 *      403:
 *        description: no eres administrador del grupo
 */


//todo lo del chat de voz sera con los sockets y frontEnd 
router.get('/:idChannel',audioChannelController.getAudioChannel)

// router.put('/:idChannel/enterCall',auth,express.json(),audioChannelController.enterCall);

// router.put('/:idChannel/exitCall',auth,express.json(),audioChannelController.exitCall);


router.put('/:idChannel/name',auth,express.json(),audioChannelController.changeChannelName);

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
 *      - in: header
 *        name: token
 *        description: el token del usuario actual
 * 
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
 *        description: token invalido
 * 
 *      403: 
 *        description: no eres administrador por lo tanto no puedes cambiar el nombre
 *      
 *      404:
 *        description: no se encontro al grupo o canal 
 */

module.exports = router