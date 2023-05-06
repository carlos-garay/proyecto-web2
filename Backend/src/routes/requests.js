const express = require('express')
const router = express.Router({mergeParams: true})
const requestsController = require('../controllers/requests')
const auth = require('../middlewares/auth')


//la ruta para llegar aqui es 
//users/:idUser/requests

router.post('/',express.json(),auth,requestsController.crearRequest)

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
 *      - in: header
 *        name: token
 *        description: el token del usuario actual
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
 *        description: objeto del request creado
 *        schema:
 *            example:
 *               {
 *                 "_id": "643b678619262fca193b0fb2",
 *                 "sender": "Usuario precargado1",
 *                 "receiver": "Usuario precargado2",
 *                 "status": 1,
 *                 "__v": 0,
 *                 "image": "no image"
 *               }
 *      400: 
 *        description: no se pudo crear el request
 *      401:
 *        description: token invalido
 *      404: 
 *        description: no se encontro el usuario al que se manda 
 */

router.get('/',auth,requestsController.getRequests)
/**
 * @swagger
 * /users/{idUser}/requests:
 *  get:
 *    tags:
 *      - requests
 *    description: traer los arreglos de requests del usuario poblados
 *    parameters:
 *      - in: path
 *        name: idUser
 *        description: el id del usuario en cuya sesion estamos 
 *        schema:
 *          type: string
 * 
 *      - in: header
 *        name: token
 *        description: el token del usuario actual
 * 
 *    responses:
 *      200:
 *        description: se obtuvieron los arreglos de requests exitosamente
 *        schema:
 *          example:
 *      
 *               {
 *               "ReqSent": [
 *                   {
 *                   "_id": "643b678619262fca193b0fb2",
 *                   "sender": "Usuario precargado1",
 *                   "receiver": "Usuario precargado2",
 *                   "status": 1,
 *                   "__v": 0,
 *                   "image": "no image"
 *                   },
 *                   {
 *                   "_id": "643c86b7b8ca456b01854cca",
 *                   "sender": "Usuario precargado1",
 *                   "receiver": "Usuario precargado3",
 *                   "status": 1,
 *                   "__v": 0,
 *                   "image": "no image"
 *                   }
 *               ],
 *               "ReqReceived": [
 *                   {
 *                   "_id": "643c9cd97963286ff4f67f08",
 *                   "sender": "Usuario precargado3",
 *                  "receiver": "Usuario precargado1",
 *                   "status": 0,
 *                   "__v": 0,
 *                   "image": "no image"
 *                   }
 *               ]
 *               }
 *      401:
 *        description: token invalido
 *      404: 
 *        description: no se encontró al usuario o sus requests. 
 */



router.put('/:reqId/accept',auth,requestsController.acceptRequest)

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
 * 
 *      - in: header
 *        name: token
 *        description: el token del usuario actual
 * 
 *    responses:
 *      200:
 *        description: objeto del request aceptado
 *      400: 
 *        description: no se pudo aceptar correctamente la solicitud
 *      401:
 *        description: token invalido
 */

router.put('/:reqId/decline',auth,requestsController.declineRequest)

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
 * 
 *      - in: header
 *        name: token
 *        description: el token del usuario actual
 * 
 *    responses:
 *      200:
 *        description: objeto del request rechazado
 *      400: 
 *        description: no se pudo rechazar correctamente la solicitud
 *      401:
 *        description: token invalido
 */

module.exports = router