const express = require('express')
const router = express.Router({mergeParams: true})
const messagesController = require('../controllers/messages')
const auth = require('../middlewares/auth')

//para estar aqui ya pase por groups/:idGroup/channels/:idChannel/messages

//post
router.post('/',auth,express.json(),messagesController.crearMensaje)
/**
 * @swagger
 * /groups/{idGroup}/channels/{idChannel}/messages:
 *  post:
 *    tags:
 *      - messages
 *    description: crear un nuevo mensaje 
 *    parameters:
 * 
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
 * 
 *      - in: header
 *        name: token
 *        description: el token del usuario actual
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
 *    responses:
 *      200:
 *        description: objeto del mensaje creado 
 *        schema:
 *          example:
 *              {
 *                  "UserInfo": {
 *                      "idUser": "6420ab210db1252132a4a328",
 *                      "token": "Undefined"
 *                  },
 *                  "messageInfo": {
 *                      "content": "23"
 *                  }
 *               }
 *      401:
 *        description: token invalido
 *      400: 
 *        description: no se pudo crear el mensaje 
 */


module.exports = router