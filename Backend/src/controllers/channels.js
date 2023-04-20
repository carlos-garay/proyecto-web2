const Channel = require('../models/channels');
const User = require('../models/users');
const Group = require('../models/groups');
const Message = require('../models/messages');


const ChannelController = {

    getMessages: (req,res)=>{
        let idChannel = req.params.idChannel;
        Channel.findById(idChannel)
            .populate("arrMembers")
            .populate("arrMessages")
            .then(channel => {
                //Cambiamos el sender de su id a su nombre para que se pueda desplegar en el mensaje
                channel.arrMessages.map(msg => {

                    let foundSender =  channel.arrMembers.find(({_id}) => _id == msg.sender)
                    if(foundSender){
                        msg.sender = foundSender.name
                    }else{
                        msg.sender = "Usuario eliminado"
                    }
                })
                res.status(200).type("application/json").json(channel);
            })
            .catch(err => {
                res.status(404).send("Error al obtener datos del canal con el id: "+idChannel +' '+ err);
            })
    },

    createChannel: (req,res)=>{
        console.log(req.params)
        let idGroup = req.params.idGroup;

        Group.findById(idGroup)
        .then(grupo =>{
            //El canal automaticamente se crea con todos los miembros
            Channel.create({arrMembers:grupo.arrUsers}).then(channel => {
                //Intentamos asignar el _id del canal al arreglo de canales del grupo
                Group.findByIdAndUpdate(idGroup, {$push:{arrChannels: channel._id}}, { new : true }).then(group => {
                    res.status(200).send(`Se agregó el canal ${channel._id} al grupo  ${group.title}`);
                })
                .catch(err => {
                    //Si no se puedo guardar al grupo el canal, hay que eliminarlo de la base de datos de canales
                    Channel.findByIdAndDelete(channel._id);
                    res.status(404).send("No se encontró el grupo con el id: "+ idGroup);
                    
                });
            })
            .catch(err =>{
                res.status(500).send("Error en el servidor " + err);
            })
        }).catch(err=>{
            res.status(404).send("Error al encontrar el grupo "+err)
        })
    },

    deleteChannel: (req,res)=>{
        let idGroup = req.params.idGroup;
        let idChannel = req.params.idChannel;
        Group.findByIdAndUpdate(idGroup,{$pull:{arrChannels: idChannel}}).then(group => {
            Channel.findByIdAndDelete(idChannel).then(channel => {
                console.log(group);
                console.log(channel);
                //borrar los mensajes que contenía el chat
                Message.deleteMany({_id:{$in: channel.arrMessages}})
                .then(
                    res.status(200).send(`Se eliminó el canal ${idChannel} del grupo  ${group._id}`)
                )
                .catch(err=>{
                    res.status(400).send('error al eliminar los mensajes del canal');
                })
            })
            .catch(err =>{
                res.status(404).send("No se encontró el canal con el id: "+ idChannel)});
        })
        .catch(err => {
            res.status(404).send("No se encontró el grupo con el id: "+ idGroup);
        })
    },

    addMemberToChannel: (req,res)=>{
        let email = req.body.email;
        let idChannel = req.params.idChannel;
        let idGroup = req.params.idGroup;
        
        //Obtener id con el email
        User.findOne({email: email})
        .then(user=>{
            Group.findById(idGroup)
            .then(group=>{
                //Validar que forme parte del grupo
                if(!group.arrUsers.includes(user._id)){
                    res.status(404).send('El usuario no forma parte del grupo');
                }
                else{
                    Channel.findById(idChannel)
                    .then(channel=>{
                        //Validar que no se duplique
                        if(channel.arrMembers.includes(user._id)){
                            res.status(400).send('Ya esta agregado el usuario al canal')
                        }
                        else{
                            channel.arrMembers.push(user._id)
                            channel.save()
                            .then(channel=>{
                                res.status(200).send(`Se añadio al usuario al canal ${channel._id} del grupo  ${idGroup}`)
                            })
                            .catch(err=>{res.status(400).send("Error al añadir usuario al canal")})
                        }
                    })
                    .catch(err=>{res.status(404).send('No se encontró al canal con el id '+ idChannel)})
                }
            })
            .catch(err=>{res.status(404).send('No se encontro el grupo con el id '+ idGroup)})

        })
        .catch(err => {
            res.status(404).send("No se encontró el usuario con el id correo " + email);
            
        });
    },

    removeMemberFromChannel: (req,res)=>{
        let email = req.body.email;
        let idChannel = req.params.idChannel;
        let idGroup = req.params.idGroup;
        console.log(email);
        User.findOne({email: email})
        .then(user=>{
            Channel.findByIdAndUpdate(idChannel, {$pull:{arrMembers:user._id}}, { new : true })
            .then(channel => {
                res.status(200).send(`Se elimino al usuario ${email} del canal ${channel._id} del grupo  ${idGroup}`);
            })
            .catch(err => {
                res.status(404).send("No se encontró el canal con el id: "+ idChannel + " "+ err);
            });
        })
        .catch(err =>{
            res.status(404).send("No se encontró el usuario con el email "+ email + " "+err );
        })
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
                Channel.findByIdAndUpdate(idChannel,{title:newTitle},{ new : true })
                    .then(updatedChannel => {
                        res.status(200).send(`se ha cambiado el nombre del canal a ${updatedChannel.title}`)
                    })
                    .catch(error =>{
                        res.status(400).send('No pudo modificarse el nombre del canal')
                    })
            }
            else{
                res.status(401).send('No tienes permisos para cambiar el nombre')
            }
        })
        .catch(error => {
            res.status(404).send('No se encontro ese grupo')
        })
    }

}

module.exports = ChannelController