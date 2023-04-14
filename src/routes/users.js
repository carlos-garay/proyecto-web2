const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

//las rutas de los requests
const rutasRequests = require('./requests')

router.use('/:idUser/requests',rutasRequests);



router.post('/register',express.json(),usersController.registerUser);

/**
 * @swagger
 * /users:
 *  post:
 *    tags:
 *      - User
 *    description: El usuario se registra en la aplicación proporcionando nombre, email y contraseña
 *    parameters:
 *      - in: body
 *        name: user
 *        description: objeto con el nombre, email y contraseña
 *        schema:
 *          type: object
 * 
 *    responses:
 *      201:
 *        description: mensaje se creo el usuario con su email
 *      500:
 *        description: Error en el servidor
 */


router.get('/:idUser',usersController.loadUser);
/**
 * @swagger
 * /users/{idUser}:
 *  get:
 *    tags:
 *      - User
 *    description: obtener los datos del usuario con sus friendrequests, amigos, grupos y mensajes directos para cargar en la página
 *    parameters:
 *      - in: path
 *        name: idUser
 *        description: id del usuario a obtener
 *        schema:
 *          type: string
 * 
 *    responses:
 *      200:
 *        description: objeto del usuario recuperado, con sus arreglos de ids a otras entidades populados 
 *      404:
 *        description: No se encontro el usuario con el id idUSer
 */


router.put('/:idUser/name',express.json(),usersController.updateUserName);
/**
 * @swagger
 * /users/{idUser}/name:
 *  put:
 *    tags:
 *      - User
 *    description: se cambia el nombre del usuario
 *    parameters:
 *      - in: path
 *        name: idUser
 *        description: id del usuario a obtener
 *        schema:
 *          type: string
 * 
 *      - in: body
 *        name: name
 *        description: nombre del usuario a cambiar
 *        schema:
 *          type: object
 * 
 *    responses:
 *      200:
 *        description: mensaje se actualizó el usuario y su nombre nuevo
 *      404:
 *        description: No se encontro el usuario con el id idUSer
 */


router.put('/:idUser/password',express.json(),usersController.updateUserPassword);
/**
 * @swagger
 * /users/{idUser}/password:
 *  put:
 *    tags:
 *      - User
 *    description: se cambia el nombre del usuario
 *    parameters:
 *      - in: path
 *        name: idUser
 *        description: id del usuario a obtener
 *        schema:
 *          type: string
 * 
 *      - in: body
 *        name: name
 *        description: nombre del usuario a cambiar
 *        schema:
 *          type: object
 * 
 *    responses:
 *      200:
 *        description: mensaje se actualizó el usuario y su nombre nuevo
 *      404:
 *        description: No se encontro el usuario con el id idUSer
 */

router.delete('/:idUser/friends/:idFriend/remove',usersController.removeFriend);
//users/:idUser/friends/:idFriend/remove      

/**
 * @swagger
 * /users/{idUser}/friends/{idFriend}/remove:
 *  delete:
 *    tags:
 *      - User
 *    description: se elimina un amigo 
 *    parameters:
 *      - in: path
 *        name: idUser
 *        description: id del usuario a obtener
 *        schema:
 *          type: string
 *      - in: path
 *        name: idFriend
 *        description: id del amigo que quieres borrar 
 *        schema:
 *          type: string
 * 
 *    responses:
 *      200:
 *        description: se elimino exitosamente el amigo
 *      404:
 *        description: error al eliminar el amigo 
 */

module.exports = router