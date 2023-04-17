const Request = require('../models/requests')
const User = require('../models/users')
const Channel = require('../models/channels')

//users/:idUser/requests

const RequestController = {
    crearRequest: (req,res)=>{
        let friendEmail = req.body.friendEmail //body va a traer friendEmail con el 
        let idUserSender = req.params.idUser 
        
        //Obtenemos al usuario que envía el request
        User.findOne({email: friendEmail})
        .then(receiver => { //traemos el que va a recibirlo de la base de datos 
            
            let idReceiver = receiver._id //id de quien recibe la solicitud

            //Verificamos que el usuario no se este añadiendo a si mismo
            if(idUserSender == idReceiver){
                res.status(400).send('No puedes agregarte a ti mismo como amigo')
            }
            else{

                if(receiver.arrFriends.includes(idUserSender)){
                    res.status(400).send('El usuario ya se encuentra en la lista de amigos')
                }else{
                    let object = {
                        sender : idUserSender,
                        receiver: idReceiver
                    }
                    
                    Request.create(object)
                        .then(newRequest => { //el nuevo request creado 
                            let newRequestId = newRequest._id //id del request creado
                            User.findByIdAndUpdate(idUserSender,{$push:{arrRequestsSent:newRequestId}},{new : true}) //agregamos
                                .then(senderUser=>{
                                    User.findByIdAndUpdate(idReceiver,{$push:{arrRequestsReceived:newRequestId}},{new : true}) //agregamos
                                        .then(receiverUser=>{
                                            res.status(200).send(`Se creo el request ${newRequestId} del usuario ${senderUser.name} al usuario ${receiverUser.name}`)
                                        })
                                        .catch(error =>{
                                            res.status(400).send('No se pudo agregar el id al usuario que lo recibe')
                                        })
                                })
                                .catch(error =>{
                                    res.status(400).send('No se pudo agregar el id al usuario que lo envia')
                                })
                        })
                        .catch(error =>{
                            res.status(400).send('No se pudo crear este request '+ error)
                        })
                }
            }
        })
        .catch(error =>{
            res.status(404).send('No se encontro ese usuario')
        })
    },

    // users/:idUSer/requests
    getRequests:(req,res)=>{
        let idUser = req.params.idUser;
        User.findById(idUser)
            .populate("arrRequestsSent")
            .populate("arrRequestsReceived")
            .then(usuario => {
                //obtenemos los arreglos de requests que tiene el usaurio
                arraysRequests= {ReqSent: usuario.arrRequestsSent, ReqReceived: usuario.arrRequestsReceived }
                console.log(usuario);
                res.status(200).type("application/json").json(arraysRequests);

            })
            .catch(err => {
                res.status(404).send("No se encontró el usuario con el id: "+idUser +' '+ err);
            })
 
    },

    //     /:reqId/accept
    acceptRequest:(req,res)=>{
        Request.findByIdAndUpdate(req.params.reqId,{status:1},{new : true}) //actualizar estado 
            .then(response => { //response trae la solicitud de amistad actualizada
                //crear el chat nuevo
                let object = {
                    arrMembers:[response.sender, response.receiver]
                }
                Channel.create(object)
                    .then(newChannel => {
                        User.findByIdAndUpdate(response.sender,{$push:{arrFriends:response.receiver ,arrDirectMessages:newChannel._id}},{new : true})
                            .then(senderUser => {
                                User.findByIdAndUpdate(response.receiver,{$push:{arrFriends:response.sender, arrDirectMessages:newChannel._id}},{new : true})
                                    .then(receiverUser => {
                                        //mandar respuesta
                                        res.status(200).send(`Se acepto el request ${response._id} entre ${senderUser.name} y ${receiverUser.name} `)
                                    })
                                    .catch(error =>{
                                        res.status(400).send('No se pudo agregar a la lista de amigos de receiver')
                                    })
                            })
                            .catch(error =>{
                                res.status(400).send('No se pudo agregar a la lista de amigos de sender')
                            })
                    })
                    .catch(error => {
                        res.status(400).send('error al crear el nuevo canal entre los 2 usuarios')
                    })   
            })
            .catch(error =>{
                res.status(400).send('No se pudo aceptar la solicitud')
            })
    },
    //     /:reqId/decline
    declineRequest:(req,res)=>{
        Request.findByIdAndUpdate(req.params.reqId,{status:2})
            .then(response => {
                res.status(200).send(`Se rechazo el request ${response._id}`)
            })
            .catch(error =>{
                res.status(400).send('No se pudo rechazar la solicitud')
            })
    }
}

module.exports = RequestController