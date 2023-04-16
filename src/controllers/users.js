const User = require('../models/users');
const Group = require('../models/groups');
const Request = require('../models/requests');
const Channel = require('../models/channels');
const Message = require('../models/messages');

const UserController = {

    //registrar usuario, se tendrán cambios cuando se tenga implementación de tokens
    registerUser: (req,res)=>{
        let user = User(req.body);
        user.save().then((user) =>{
            res.status(201).send(user._id);
        })
        .catch(err =>{
            res.status(500).send('Error en el servidor '+err);
        });
    },

    //evaluar que concuerden las contraseñas CAMBIOS CUANDO SE ENCRIPTEN Y SE USEN TOKENS
    loginUser: (req,res)=>{
        let email = req.body.email
        let password = req.body.password

        User.findOne({ email: `${email}` })
            .then(user => {
                if(user.password == password){
                    res.status(201).send(user._id);
                } else {
                    res.status(404).type('text/plain; charset=utf-8').send(`Email o contraseña incorrecta`);
                }
            })
            .catch(err => {
                res.status(404).type('text/plain; charset=utf-8').send(`Email no registrado`+err);
            });
    },

    //Cambiar el nombre del usuario
    updateUserName: (req,res)=>{
        let nameChange = req.body.name;
        let idUser = req.params.idUser;
        User.findByIdAndUpdate(idUser, {name: nameChange}, { new : true }).then(user => {
            res.status(200).type('text/plain; charset=utf-8').send(`Se actualizó el usuario ${user.name}`);
        })
        .catch(err => {
            res.status(404).send("No se encontró el usuario con el id: "+idUser);
        });
    },

    //Cambiar el password del usuario, se modificará cuando se incluya la encripción 
    updateUserPassword: (req,res)=>{
        let passwordChange = req.body.password;
        let idUser = req.params.idUser;
        console.log(req.params);
        User.findByIdAndUpdate(idUser, {password: passwordChange}, { new : true }).then(user => {
            res.status(200).type('text/plain; charset=utf-8').send(`Se cambio la contraseña del usuario ${user.name}`);
        })
        .catch(err => {
            res.status(404).send("No se encontró el usuario con el id: "+idUser);
        });
    },

    //Obtener datos del usuario para cargar su página principal
    //Consulta la colección de grupos para cargar los grupos de los que es miembro
    loadUser: (req,res) => { 
        let idUser = req.params.idUser;
        User.findById(idUser)
            .populate("arrGroups")
            .populate("arrFriends")
            .populate("arrRequestsSent")
            .populate("arrRequestsReceived")
            .populate("arrDirectMessages")
            .then(usuario => {
                //Obtenemos por cada id en el arreglo de grupos del usuario el objeto del grupo correspondiente
                //Para que posteriormente se puedan usar para cargar sus íconos y nombres en la aplicación
                if(usuario.arrGroups.length >0){ 
                    console.log(usuario);
                    res.status(200).type("application/json").json(usuario);
                //Si no contiene ningún grupo
                }else{
                    let objUser = {}
                    Object.assign(objUser,usuario.toObject());
                    objUser.allGroups = []; 
                    res.status(200).type("application/json").json(objUser);
                }
            })
            .catch(err => {
                res.status(404).send("No se encontró el usuario con el id: "+idUser +' '+ err);
            })
    },
    removeFriend: (req,res) =>{
        //borrar los ids de la lista de usuarios
        //borrar el canal de la lista de canales de ambos
        //eliminar el canal de texto que los unia 
        let idUser = req.params.idUser
        let idFriend = req.params.idFriend
        User.findById(idUser)
            .populate("arrDirectMessages")
            .then(usuario => {
                //Encontramos el canal que comparte con el amigo
                let idChannel = usuario.arrDirectMessages.find(({ arrMembers }) => arrMembers.includes(idFriend))._id
                if(idChannel == undefined){
                    res.status(404).send("No se encontró el canal entre usuarios");
                }
                else{
                    //Borramos este canal
                    Channel.findByIdAndDelete(idChannel)
                        .then(channel => {
                            console.log(channel);
                            //borrar los mensajes que contenía el chat
                            Message.deleteMany({_id:{$in: channel.arrMessages}})
                            .then(
                                console.log('se borro exitosamente el canal ' + channel.id)
                            )
                            .catch(err=>{
                                res.status(400).send('error al eliminar los mensajes del canal');
                            })
                        })
                        .catch(err =>{
                            res.status(404).send("No se encontró el canal con el id: "+ idCanal)
                        });
                    
                    //quitamos los amigos de la lista y quitamos el id del canal del arreglo de mensajes directos
                    User.findByIdAndUpdate(idUser,{ $pull: { arrFriends: idFriend, arrDirectMessages:idChannel}},{new:true}) 
                        .then(user1 =>{
                            User.findByIdAndUpdate(idFriend,{ $pull: { arrFriends: idUser, arrDirectMessages:idChannel}},{new:true}) 
                                .then(user2 =>{
                                    res.status(200).send(`Se elimino la amistad entre ${user1.name} y ${user2.name}`);
                                })
                                .catch(error =>{
                                    res.status(400).send("No se pudo eliminar desde usuario 2 " + error)
                                })
                        })
                        .catch(error =>{
                            res.status(400).send("No se pudo eliminar desde usuario 1 " + error)
                        })
                }
            })
            .catch(error =>{
                res.status(404).send("No se encontró al usuario " + error)
            })

    }   
}

module.exports = UserController