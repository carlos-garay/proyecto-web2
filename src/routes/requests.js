const express = require('express')
const router = express.Router({mergeParams: true})
const requestsController = require('../controllers/requests')

//la ruta para llegar aqui es 
//users/:idUser/requests

router.post('/',express.json(),requestsController.crearRequest)

/**
 * @swagger
 * /users/{idUser}/requests:
 *  post:
 *    tags:
 *      - requests
 *    description: crear una nueva solicitud de amistad 
 *    parameters:
 * 
 *      - in: path
 *        name: idUser
 *        description: el id del usuario en cuya sesion estamos 
 *        schema:
 *          type: string
 * 
 *      - in: body
 *        name: bodyInfo
 *        description: objeto que contiene correo de la persona a agregar
 *        schema:
 *          type: object
 *          example:
 *            {"friendEmail": "otro2@test.com"}
 *    responses:
 *      200:
 *        description: se creo el request
 *      400: 
 *        description: no se pudo crear el request
 *      404: 
 *        description: no se encontro el usuario al que se manda 
 */

router.put('/:reqId/accept',requestsController.acceptRequest)

/**
 * @swagger
 * /users/{idUser}/requests/{reqId}/accept:
 *  put:
 *    tags:
 *      - requests
 *    description: aceptar una solicitud de amistad, se crea un nuevo chat y se agregan al arreglo de amigos
 *    parameters:
 *      - in: path
 *        name: idUser
 *        description: el id del usuario en cuya sesion estamos 
 *        schema:
 *          type: string
 *      - in: path
 *        name: reqId
 *        description: el id del request que se quiere aceptar 
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: se acepto el request correctamente
 *      400: 
 *        description: no se pudo aceptar correctamente la solicitud
 */

router.put('/:reqId/decline',requestsController.declineRequest)

/**
 * @swagger
 * /users/{idUser}/requests/{reqId}/decline:
 *  put:
 *    tags:
 *      - requests
 *    description: rechazar una solicitud de amistad
 *    parameters:
 *      - in: path
 *        name: idUser
 *        description: el id del usuario en cuya sesion estamos 
 *        schema:
 *          type: string
 *      - in: path
 *        name: reqId
 *        description: el id del request que se quiere rechazar
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: se rechazo el request
 *      400: 
 *        description: no se pudo rechazar correctamente la solicitud
 */

module.exports = router