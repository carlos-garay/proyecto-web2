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
 * /users:
 *  post:
 *    tags:
 *      - groups
 *    description: crear un grupo y añadir al usuario que lo crea como admin
 *    parameters:
 *      - in: body
 *        name: bodyInfo
 *        description: objeto información de usuraio e informacion del grupo con titulo e imagen
 *        schema:
 *          type: object
 *    responses:
 *      200:
 *        description: el usuario ha creado el grupo exitosamente
 *      400: 
 *        description: no pudo crearse el nuevo grupo 
 */


router.delete('/:idGroup',groupsController.deleteGroup) //esta bien criminal este dude, borrar el arreglo de toda la lista de usuarios, borrar todos sus canales y borrar todos los mensajes LOOOOL
/**
 * @swagger
 * /users/{idGroup}:
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
 * /users/{idGroup}:
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
 *    responses:
 *      200:
 *        description: el usuario se unio al grupo exitosamente
 *      400: 
 *        description: no se pudo agregar al grupo
 */


router.get('/:idGroup',groupsController.getGroup) //traer todo lo de ese grupo, usamos populate 

/**
 * @swagger
 * /users/{idGroup}:
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
 *      404: 
 *        description: no se encontro ese grupo 
 */

router.put('/:idGroup/name',express.json(),groupsController.changeGroupName) // el body va a traer un atribuo llamado nombreGrupo



module.exports = router