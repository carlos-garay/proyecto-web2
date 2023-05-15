const User = require('../models/users');
const Group = require('../models/groups');
const Request = require('../models/requests');
const Channel = require('../models/channels');
const Message = require('../models/messages');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');

const UserController = {

    //registrar usuario, se tendrán cambios cuando se tenga implementación de tokens
    registerUser: (req,res)=>{
        console.log(req.body)
        let objectUser = req.body
        objectUser['token']= 'placeholder'
        let user = User(objectUser);
        user.save().then((user) =>{
            token = jwt.sign({email:req.body.email},process.env.TOKEN_KEY,{expiresIn: "5h"})
            let objUserId = {_id:user._id, token:token}
            res.status(201).type("application/json").json(objUserId);
        })
        .catch(err =>{
            res.status(400).send('email incorrecto '+ err);
        });
    },

    //evaluar que concuerden las contraseñas 
    loginUser: (req,res)=>{
        let email = req.body.email
        let password = req.body.password

        User.findOne({ email: `${email}` })
        .then(user => {
            // cuando concuerdan generamos el token que se guardará en el localstorage
            if (bcrypt.compareSync(password, user.password)) {
                try{
                    token = jwt.sign({email:email},process.env.TOKEN_KEY,{expiresIn: "5h"})
                    let objUserId = {_id:user._id, token:token}
                    res.status(201).type("application/json").json(objUserId);
                }
                catch(err){
                    res.status(500).send("No se pudo iniciar sesión")
                }

            } else {
                res.status(404).type('text/plain; charset=utf-8').send(`Email o contraseña incorrecta`);
            }
        })
        .catch(err => {
            res.status(404).type('text/plain; charset=utf-8').send(`Email o contraseña incorrecta`);
        });
    },

    //Cambiar el nombre del usuario
    updateUserName: (req,res)=>{
        let nameChange = req.body.name;
        let idUser = req.params.idUser;
        User.findByIdAndUpdate(idUser, {name: nameChange}, { new : true })
        .select('-password')
        .then(user => {
            res.status(200).type("application/json").json(user);
        })
        .catch(err => {
            res.status(404).send("No se encontró el usuario con el id: "+idUser);
        });
    },

    //Cambiar el password del usuario, se modificará cuando se incluya la encripción 
    updateUserPassword: (req,res)=>{
        let passwordChange = bcrypt.hashSync(req.body.password, 10);
        let idUser = req.params.idUser;
        console.log(req.params);
        User.findByIdAndUpdate(idUser, {password: passwordChange}, { new : true })
        .select('-password')
        .then(user => {
            res.status(200).type("application/json").json(user);
        })
        .catch(err => {
            res.status(404).send("No se encontró el usuario con el id: "+idUser);
        });
    },


 //Obtener datos del usuario para cargar su página principal
    //Consulta la colección de grupos para cargar los grupos de los que es miembro
    loadUser: (req,res) => { 
        let idUser = req.params.idUser;
        User.findById(idUser,"-password")
        .populate("arrGroups")
        .then(usuario => {
            //Obtenemos por cada id en el arreglo de grupos del usuario el objeto del grupo correspondiente
            //Para que posteriormente se puedan usar para cargar sus íconos y nombres en la aplicación
            res.status(200).type("application/json").json(usuario);

        })
        .catch(err => {
            res.status(404).send("No se encontró el usuario con el id: "+idUser);
        })
    },

    loadFriends: (req,res) => { 
        let idUser = req.params.idUser;
        User.findById(idUser)
        .populate("arrFriends","-password")
        .then(usuario => {
            //Obtenemos por cada id en el arreglo de amigos del usuario el objeto del usuario correspondiente
            //Para que posteriormente se puedan usar para cargar sus íconos y nombres
            console.log(usuario);
            res.status(200).type("application/json").json(usuario.arrFriends);
            
        })
        .catch(err => {
            res.status(404).send("No se encontró el usuario con el id: "+idUser);
        })
    },

    loadChannel: (req,res) => { 
        let idUser = req.params.idUser;
        let idFriend = req.params.idFriend;
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
                .populate("arrMembers","-password")
                .then(channel => {
                    //Poner el titulo del canal segun el nombre de los usuarios
                    Channel.findByIdAndUpdate(idChannel,{title: "DM " + channel.arrMembers[0].name + " y " + channel.arrMembers[1].name },{new:true})
                        .populate("arrMembers","-password")
                        .populate("arrMessages")
                        .then(newChannel =>{
                            //Cambiamos el sender de su id a su nombre para que se pueda desplegar en el mensaje
                            newChannel.arrMessages.map(msg => {
                                
                                let foundSender = newChannel.arrMembers.find(({_id}) => _id == msg.sender)
                                if(foundSender){
                                    msg.sender = foundSender.name;
                                    msg.image = foundSender.image;
                                }else{
                                    msg.sender = "Usuario eliminado";
                                }
                            })
                            res.status(200).type("application/json").json(newChannel);
                        })
                        .catch(err=>{
                            res.status(400).send("Error al cambiar el título del canal: "+idChannel);
                        })
                })
                .catch(err => {
                    res.status(400).send("Error al obtener datos del canal con el id: "+idChannel);
                })
            }
                
        })
        .catch(error =>{
            res.status(404).send("No se encontró al usuario " )
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
                res.status(400).send('No se pudo agregar el mensaje al canal');
            })
        })
        .catch(error =>{
            res.status(400).send('No se pudo crear el mensaje');
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
                    .select('-password') 
                    .then(user2 =>{
                        res.status(200).type("application/json").json(user2);
                    })
                    .catch(error =>{
                        res.status(400).send("No se pudo eliminar desde usuario 2 ")
                    })
                })
                .catch(error =>{
                    res.status(400).send("No se pudo eliminar desde usuario 1 ")
                })
            }
        })
        .catch(error =>{
            res.status(404).send("No se encontró al usuario ")
        })

    },   

    uploadProfilePicture: (req,res)=>{
        let idUser = req.params.idUser;
        let filename = req.file.filename;        
        
        User.findByIdAndUpdate(idUser,{image: filename}) 
        .then(user =>{
            //Si la imagen anterior no es la default elimínala
            if(user.image != "noimage.jpg"){
                console.log(user.image)
                let imagePath = path.join(__dirname, '../../uploads/',user.image)
                fs.unlink(imagePath);
            }
            res.status(200).send({imgUrl:filename});
        })
        .catch(error =>{
            res.status(404).send("Error al subir la foto de perfil");
        })

    }



}

module.exports = UserController