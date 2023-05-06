const audioChannel = require('../models/audioChannels')
const Group = require('../models/groups')
const User = require('../models/users');


const audioChannelController = {

    createAudioChannel: (req,res)=>{
        let idGroup = req.params.idGroup;
        let idUser = req.headers.user;

        Group.findById(idGroup)
        .then(grupo =>{
            if(grupo.arrAdmins.includes(idUser)){
                //El canal automaticamente se crea con todos los miembros
                audioChannel.create({arrMembers:grupo.arrUsers})
                .then(channel => {
                    //Intentamos asignar el _id del canal al arreglo de canales de audio del grupo
                    Group.findByIdAndUpdate(idGroup, {$push:{arrAudioChannels: channel._id}}, { new : true })
                    .then(group => {
                        res.status(200).type("application/json").json(channel);
                    })
                    .catch(err => {
                        //Si no se puedo guardar al grupo el canal, hay que eliminarlo de la base de datos de canales
                        audioChannel.findByIdAndDelete(channel._id);
                        res.status(404).send("No se encontró el grupo con el id: "+ idGroup);
                        
                    });
                })
                .catch(err =>{
                    res.status(500).send("Error en el servidor ");
                })
            }
            else{
                res.status(403).send('No eres administrador del grupo')
            }
        })
    },

    deleteAudioChannel: (req,res)=>{
        let idGroup = req.params.idGroup;
        let idChannel = req.params.idChannel;
        let idUser = req.headers.user;
        Group.findById(idGroup)
        .then(group=>{
            if(group.arrAdmins.includes(idUser)){
                index = group.arrAudioChannels.indexOf(idChannel);
                group.arrAudioChannels.splice(index,1);
                group.save()
                .then(group => {
                    audioChannel.findByIdAndDelete(idChannel)
                    .then(channel => {
                        res.status(200).type("application/json").json(channel);
                    })
                    .catch(err =>{
                        res.status(404).send("No se encontró el canal de audio con el id: "+ idChannel)});
                })
                .catch(err => {
                    res.status(404).send("No se encontró el grupo con el id: "+ idGroup);
                })
            }
            else{
                res.status(403).send("No eres administrador de este grupo")
            }
        })
        .catch(err=>{
            res.status(404).send("No se encontró el grupo con el id: "+ idGroup)
        })
    },

    addMemberToAudioChannel: (req,res)=>{
        let email = req.body.email;
        let idChannel = req.params.idChannel;
        let idGroup = req.params.idGroup;
        let idAdmin = req.headers.user;



        //Obtener id con el email
        User.findOne({email: email},"-password")
        .then(user=>{
            Group.findById(idGroup)
            .then(group=>{
                //Validar que forme parte del grupo
                if(group.arrAdmins.includes(idAdmin)){
                    if(group.arrUsers.includes(user._id)){
                        audioChannel.findById(idChannel)
                        .then(channel=>{
                            //Validar que no se duplique
                            if(!channel.arrMembers.includes(user._id)){
                                channel.arrMembers.push(user._id)
                                channel.save()
                                .then(channel=>{
                                    res.status(200).type("application/json").json(user)
                                })
                                .catch(err=>{res.status(400).send("Error al añadir usuario al canal de audio")})

                            }
                            else{
                                res.status(400).send('Ya esta agregado el usuario al canal de audio')

                            }
                        })
                        .catch(err=>{res.status(404).send('No se encontró al canal de audio con el id '+ idChannel)})
    
                    }
                    else{
                        res.status(404).send('El usuario no forma parte del grupo');
                    }
                }
                else{
                    res.status(403).send('No eres administrador del grupo')
                }
            })
            .catch(err=>{res.status(404).send('No se encontro el grupo con el id '+ idGroup)})

        })
        .catch(err => {
            res.status(404).send("No se encontró el usuario con el id correo " + email);
            
        });
    },

    removeMemberFromAudioChannel: (req,res)=>{
        let email = req.body.email;
        let idChannel = req.params.idChannel;
        let idGroup = req.params.idGroup;
        let idAdmin = req.headers.user;


        Group.findById(idGroup)
        .then(group=>{
            if(group.arrAdmins.includes(idAdmin)){
                User.findOne({email: email},"-password")
                .then(user=>{
                    audioChannel.findByIdAndUpdate(idChannel, {$pull:{arrMembers:user._id}}, { new : true })
                    .then(channel => {
                        res.status(200).type("application/json").json(user);
                    })
                    .catch(err => {
                        res.status(404).send("No se encontró el canal de audio con el id: "+ idChannel + " ");
                    });
                })
                .catch(err =>{
                    res.status(404).send("No se encontró el usuario con el email "+ email + " " );
                })
            }
            else{
                res.status(403).send("No eres administrador del grupo")
            }
        })
        .catch(err =>{
            res.status(404).send("No se encontró el grupo")
        })
    },

    //Cambiar a conseguir el objeto del usuario
    enterCall: (req,res)=>{
        let idUser = req.body.idUser;
        let idChannel = req.params.idChannel;
        let idGroup = req.params.idGroup;
    
        Group.findById(idGroup)
        .then(group=>{
            //Validar que forme parte del grupo
            if(group.arrUsers.includes(idUser)){
                audioChannel.findById(idChannel)
                .then(channel=>{
                    if(channel.arrMembers.find(({_id}) => _id == idUser)){
                        //Validar que no se duplique
                        if(channel.arrInCall.includes(idUser)){
                            res.status(400).send('Ya esta agregado el usuario a la llamada')
                        }
                        else{
                            channel.arrInCall.push(idUser)
                            channel.save()
                            .then(channel=>{
                                res.status(200).type("application/json").json(channel)
                            })
                            .catch(err=>{res.status(400).send("Error al añadir usuario a la llamada")})
                        }
                    }
                    else{
                        res.status(403).send("No formas parte de este canal");
                    }
                })
                .catch(err=>{res.status(404).send('No se encontró al canal de audio con el id '+ idChannel)})
            }
            else{
                res.status(404).send('El usuario no forma parte del grupo');

            }
        })
        .catch(err=>{res.status(404).send('No se encontro el grupo con el id '+ idGroup)})

    },

    //Cambiar a conseguir el objeto del usuario
    exitCall: (req,res)=>{
        let idUser = req.body.idUser;
        let idChannel = req.params.idChannel;
        let idGroup = req.params.idGroup;
    
        audioChannel.findById(idChannel)
        .then(channel=>{
            //Validar que este en la llamada
            if(!channel.arrInCall.includes(idUser)){
                res.status(400).send('El usuario no forma parte de la llamada')
            }
            else{
                index = channel.arrInCall.indexOf(idUser);
                channel.arrInCall.splice(index,1);
                channel.save()
                .then(channel=>{
                    res.status(200).type("application/json").json(channel)
                })
                .catch(err=>{res.status(400).send("Error al sacar al usuario de la llamada")})
            }
        })
        .catch(err=>{res.status(404).send('No se encontró al canal de audio con el id '+ idChannel)})
    },


    changeChannelName: (req,res)=>{

        let idUser = req.body.UserInfo.idUser //usuario con el que esta iniciada la sesion actualmente 
        let idChannel = req.params.idChannel
        let idGroup = req.params.idGroup
        let newTitle = req.body.channelInfo.title //titulo nuevo que tendrá el canal 

        //verficar si en ese group el usuario es admin
        Group.findById(idGroup)
        .then(group => {
            if (group.arrAdmins.includes(idUser)){ //si esta en arreglo de administradores
                //se busca el canal a cambiar su nombre 
                audioChannel.findByIdAndUpdate(idChannel,{title:newTitle},{ new : true })
                    .then(updatedChannel => {
                        res.status(200).type("application/json").json(updatedChannel)
                    })
                    .catch(error =>{
                        res.status(400).send('No pudo modificarse el nombre del canal')
                    })
            }
            else{
                res.status(403).send('No tienes permisos para cambiar el nombre')
            }
        })
        .catch(error => {
            res.status(404).send('No se encontro ese grupo')
        })
    }

}

module.exports = audioChannelController