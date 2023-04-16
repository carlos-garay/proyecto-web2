const express = require('express')
const router = express.Router({mergeParams: true})
const groupsController = require('../controllers/groups')


//rutas de channels
const rutasChannels = require('./channels')
router.use('/:idGroup/channels',rutasChannels)
//rutas de audiochannels 
const rutasAudioChannels = require('./audioChannel')
router.use('/:idGroup/audioChannels',rutasAudioChannels)

//endpoints

router.post('/',express.json(),groupsController.createGroup)
/**
 * @swagger
 * /groups:
 *  post:
 *    tags:
 *      - groups
 *    description: crear un grupo y añadir al usuario que lo crea como admin
 *    parameters:
 *      - in: body
 *        name: bodyInfo
 *        description: objeto información de usuario e informacion del grupo con titulo e imagen
 *        schema:
 *          type: object
 *          example: 
 *              {
 *               "UserInfo": {
 *                  "idUser": "6420aafe0db1252132a4a322",
 *                  "token": "Undefined"
 *              },
 *              "groupInfo": {
 *                  "title": "grupo1"
 *                  }
 *              }
 *    responses:
 *      200:
 *        description: el usuario ha creado el grupo exitosamente
 *
 *      400: 
 *        description: no pudo crearse el nuevo grupo 
 */


router.delete('/:idGroup',groupsController.deleteGroup) //esta bien criminal este dude, borrar el arreglo de toda la lista de usuarios, borrar todos sus canales y borrar todos los mensajes LOOOOL
/**
 * @swagger
 * /groups/{idGroup}:
 *  delete:
 *    tags:
 *      - groups
 *    description: eliminar el grupo, eliminarlo del arreglo de los usuarios, eliminar todos los canales y mensajes incluidos
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: el id del grupo que queremos borrar 
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: es borro todo exitosamente
 *      400: 
 *        description: no pudo borrares el grupo 
 */

//agregar usuarios solamente será por medio de invitación, esa invitación es un link que llama este request
//el body va a traer el id del usuario que tiene sesion iniciada, que es quien se metera al grupo 
router.put('/:idGroup',express.json(),groupsController.addUserToGroup) //el body va a traer el user que quieres agregar 
/**
 * @swagger
 * /groups/{idGroup}:
 *  put:
 *    tags:
 *      - groups
 *    description: agregar un usuario al grupo 
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: el id del grupo al que queremos unirnos
 *        schema:
 *          type: string
 *      - in: body
 *        name: idUser
 *        description: objeto que contiene el id del user que quiere unirse al grupo
 *        schema:
 *          type: object
 *          example:
 *            {
 *              "idUser":"6420ab210db1252132a4a328"
 *            }
 *    responses:
 *      200:
 *        description: el usuario se unio al grupo exitosamente
 *      400: 
 *        description: no se pudo agregar al grupo
 */


router.get('/:idGroup',groupsController.getGroup) //traer todo lo de ese grupo, usamos populate 

/**
 * @swagger
 * /groups/{idGroup}:
 *  get:
 *    tags:
 *      - groups
 *    description: recuperar la información de un grupo, incluyendo miembros, canales, etc. 
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: el id del grupo que queremos recuperar 
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: objeto que contiene grupo con sus arreglos poblados con los objetos correspondientes
 *        schema:
 *          example: 
 *           application/json:
 *              {
 *                  "_id": "643b6d6f23cf96aafcebfb06",
 *                  "title": "grupo1",
 *                  "image": "noimage",
 *                  "arrUsers": [
 *                      {
 *                      "_id": "643aed8b64f01a772cb50353",
 *                      "name": "Cambio",
 *                      "email": "otro1@test.com",
 *                      "password": "password",
 *                      "token": "undefined",
 *                      "arrGroups": [
 *                          "643b6d6f23cf96aafcebfb06"
 *                      ],
 *                      "arrFriends": [],
 *                      "arrRequestsSent": [
 *                          "643b678619262fca193b0fb2",
 *                          "643b67ef19262fca193b0fbc"
 *                      ],
 *                      "arrRequestsReceived": [],
 *                      "arrDirectMessages": [],
 *                      "__v": 0
 *                      }
 *                  ],
 *                  "arrAdmins": [
 *                      {
 *                      "_id": "643aed8b64f01a772cb50353",
 *                      "name": "Cambio",
 *                      "email": "otro1@test.com",
 *                      "password": "password",
 *                      "token": "undefined",
 *                      "arrGroups": [
 *                          "643b6d6f23cf96aafcebfb06"
 *                      ],
 *                      "arrFriends": [],
 *                      "arrRequestsSent": [
 *                          "643b678619262fca193b0fb2",
 *                          "643b67ef19262fca193b0fbc"
 *                      ],
 *                      "arrRequestsReceived": [],
 *                      "arrDirectMessages": [],
 *                      "__v": 0
 *                      }
 *                  ],
 *                  "arrChannels": [
 *                      {
 *                      "_id": "643b898e18c959b67911bae3",
 *                      "title": "Nuevo canal",
 *                      "arrMembers": [
 *                          "643aed8b64f01a772cb50353",
 *                          "643af5d692b9f9f15fb1544b",
 *                          "643b02446664b9a3efbf1e60"
 *                      ],
 *                      "private": false,
 *                      "arrMessages": [
 *                          "643b917ac9b3d494bcb9cfe3",
 *                          "643b9195c9b3d494bcb9cfe6"
 *                      ],
 *                      "__v": 0
 *                      }
 *                  ],
 *                  "arrAudioChannels": [
 *                      {
 *                      "_id": "643b8cb186388eeae83cec80",
 *                      "title": "nuevo canal de audio",
 *                      "arrMembers": [
 *                          "643aed8b64f01a772cb50353",
 *                          "643af5d692b9f9f15fb1544b"
 *                      ],
 *                      "private": false,
 *                      "__v": 0
 *                      }
 *                  ],
 *                  "__v": 0
 *              }
 *        
 *      404: 
 *        description: no se encontro ese grupo 
 */

router.put('/:idGroup/name',express.json(),groupsController.changeGroupName) // el body va a traer un atribuo llamado nombreGrupo

/**
 * @swagger
 * /groups/{idGroup}/name:
 *  put:
 *    tags:
 *      - groups
 *    description: cambiar nombre a un grupo
 * 
 *    parameters:
 *      - in: path
 *        name: idGroup
 *        description: el id del grupo al que queremos cambiar su nombre 
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
 *              "groupInfo": {
 *                  "title": "cambio"
 *                  }
 *              }
 *    responses:
 *      200:
 *        description: se ha cambiado el nombre del grupo exitosamente
 *
 *      400: 
 *        description: no pudo cambiarse el nombre
 * 
 *      401: 
 *        description: no eres administrador por lo tanto no puedes cambiar el nombre
 *      
 *      404:
 *        description: no se encontro al grupo 
 */




module.exports = router