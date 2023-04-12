const express = require('express')
const router = express.Router({mergeParams: true})
const messagesController = require('../controllers/messages')

//para estar aqui ya pase por groups/:idGroup/channels/:idChannel/messages

//post
router.post('/',express.json(),messagesController.crearMensaje)
/**
 * @swagger
 * /groups/{idGroup}/channels/{idChannel}/messages:
 *  post:
 *    tags:
 *      - messages
 *    description: crear un nuevo mensaje 
 *    parameters:
 *      - in: body
 *        name: bodyInfo
 *        description: objeto información de usuraio e informacion del mensaje
 *        schema:
 *          type: object
 *      - in: path
 *        name: idGroup
 *        description: el id del grupo
 *        schema:
 *          type: string
 *      - in: path
 *        name: idChannel
 *        description: el id del canal de texto donde se insertara el mensaje
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: se creo el mensaje y se agrego al canal
 *      400: 
 *        description: no se pudo crear el mensaje 
 */


module.exports = router