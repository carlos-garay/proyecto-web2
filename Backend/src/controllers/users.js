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
            res.status(400).send('email incorrecto '+err);
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
            .then(usuario => {
                //Obtenemos por cada id en el arreglo de grupos del usuario el objeto del grupo correspondiente
                //Para que posteriormente se puedan usar para cargar sus íconos y nombres en la aplicación
                console.log(usuario);
                res.status(200).type("application/json").json(usuario);

            })
            .catch(err => {
                res.status(404).send("No se encontró el usuario con el id: "+idUser +' '+ err);
            })
    },

    loadFriends: (req,res) => { 
        let idUser = req.params.idUser;
        User.findById(idUser)
            .populate("arrFriends")
            .then(usuario => {
                //Obtenemos por cada id en el arreglo de amigos del usuario el objeto del usuario correspondiente
                //Para que posteriormente se puedan usar para cargar sus íconos y nombres
                console.log(usuario);
                res.status(200).type("application/json").json(usuario.arrFriends);
               
            })
            .catch(err => {
                res.status(404).send("No se encontró el usuario con el id: "+idUser +' '+ err);
            })
    },

    loadChannel: (req,res) => { 
        let idUser = req.params.idUser;
        let idFriend = req.params.idFriend;
        console.log(idUser);
        //Obtenemos al usuario actual
        User.findById(idUser)
        .populate("arrDirectMessages")
        .then(usuario=>{
            // Buscamos al canal entre amigos
            let idChannel = usuario.arrDirectMessages.find(({ arrMembers }) => arrMembers.includes(idFriend))._id
            if(idChannel == undefined){
                res.status(404).send("No se encontró el canal entre usuarios");
            }
            else{
                Channel.findById(idChannel)
                .populate("arrMembers")
                .then(channel => {
                    //Poner el titulo del canal segun el nombre de los usuarios
                    Channel.findByIdAndUpdate(idChannel,{title: "DM " + channel.arrMembers[0].name + " y " + channel.arrMembers[1].name },{new:true})
                        .populate("arrMembers")
                        .populate("arrMessages")
                        .then(newChannel =>{
                            //Cambiamos el sender de su id a su nombre para que se pueda desplegar en el mensaje
                            newChannel.arrMessages.map(msg => msg.sender = newChannel.arrMembers.find(({_id}) => _id == msg.sender).name)
                            res.status(200).type("application/json").json(newChannel);
                        })
                        .catch(err=>{
                            res.status(400).send("Error al cambiar el título del canal: "+idChannel +' '+ err);
                        })
                })
                .catch(err => {
                    res.status(400).send("Error al obtener datos del canal con el id: "+idChannel +' '+ err);
                })
            }
                
        })
        .catch(error =>{
            res.status(404).send("No se encontró al usuario " + error)
        })
       
    },

    sendDM: (req,res) => { 
        //dentro del request hay 2 objetos, el user que tenemos, y el mensaje que queremos crear 
        let object = req.body //trae ambos
        let idChannel = req.params.idChannel;

        // object = { //forma del objeto que traera el body 
        //     UserInfo: {
        //         idUser:'el id de este men ',
        //         token:'token'
                    //atributos extra que para esto no van a importar 
        //     },
        //     messageInfo:{
        //         content:'contenido epico'
        //     }
        // }

        //Obtenemos al usuario actual

        let temp = { //este objeto es el que va a mandarse a mongo
            sender: object.UserInfo.idUser,
            content: object.messageInfo.content,
            idChannel: idChannel
        }
        //si ya tengo el mensaje creado
        Message.create(temp) //mandamos crear mensaje con el objeto anterior
        .then(response => { //response aqui es el mensaje creado
            let idNewMessage = response._id 
            //insertarlo al arrMessages del textChannel al que pertenece 
            //modificar channel al que pertenece
            Channel.findByIdAndUpdate(idChannel,{$push:{arrMessages:idNewMessage}},{new : true})
            .then(canal =>{
                res.status(200).type("application/json").json(response);
            })
            .catch(error =>{
                res.status(400).send('No se pudo agregar el mensaje al canal' + error);
            })
        })
        .catch(error =>{
            res.status(400).send('No se pudo crear el mensaje' + error);
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