const Group = require('../models/groups')
const User = require('../models/users');
const audioChannel = require('../models/audioChannels')
const Channel = require('../models/channels')
const Message = require('../models/messages');

const GroupController = {
    createGroup : (req,res) => { //free

        // object = { //forma del objeto que traera el body 
        //     UserInfo: {
        //         idUser:'el id de este men ',
        //         token:'token'
                   //atributos extra que para esto no van a importar 
        //     },
        //     groupInfo:{
        //         title:'tituloGrupo',
        //         imagen: ''
        //     }
        // }

        let body = req.body
        let creatorId = body.UserInfo.idUser 
        let object = {
            title:body.groupInfo.title,
            //sin imagen por ahora, default la pone vacia 
            arrUsers:[creatorId],
            arrAdmins:[creatorId],
            arrChannels:[],
            arrAudioChannels:[]
        }

        Group.create(object)
        .then(newGroup => {
            console.log(newGroup);
            //obtener y modificar el usuario agregando el newGroup a la lista de grupos 
            User.findByIdAndUpdate(creatorId,{$push:{arrGroups:newGroup._id}}, { new : true })
                .then(user => {
                    res.status(200).type("application/json").json(newGroup)
                })
                .catch(error => {
                    res.status(400).send('No pudo agregarse el grupo a la lista del usuario')
                })
        })
        .catch(error =>{
            res.status(400).send('No pudo crearse el nuevo grupo ' + error)
        })
    },

    
    deleteGroup : (req,res)=>{ // borrar el grupo de todos los arreglos de los usuarios, 
        Group.findByIdAndDelete(req.params.idGroup)
        .then(grupo =>{
            //ya quitamos el grupo de los arreglos de los usuarios 
            grupo.arrUsers.forEach(usuario =>{
                //de cada usuario que pertenecia al grupo, vamos a eliminar el grupo de su arrGroups
                User.findByIdAndUpdate(usuario,{ $pull: { arrGroups: grupo._id}}, { new : true })
                    .catch(error =>{
                        res.status(400).send('error al encontrar el usuario para eliminar grupo de su ARR ' + error);
                    })
            })

            // eliminar canales de audio, se podría hacer tambien con deleteMany
            audioChannel.deleteMany({_id: { $in: grupo.arrAudioChannels }}, {new: true})
                .catch(error =>{
                    res.status(400).send('no se pudo eliminar los canales de audio ' + error);
                })
            
            //Eliminar canales de texto y mensajes incluidos
            grupo.arrChannels.forEach(canalTexto =>{
                Channel.findByIdAndDelete(canalTexto)
                .then(removedChannel =>{
                    //borrar todos los mensajes que estan en el arreglo 
                    Message.deleteMany({ _id: { $in: removedChannel.arrMessages}})
                    .catch(error => {
                        res.status(400).send('error al eliminar los mensajes del canal ' + error)
                    })
                })
                .catch(error => {
                    res.status(400).send('error al eliminar los canales de texto ' + error)
                })
            })
            res.status(200).type("application/json").json(grupo)
        })
        .catch(error =>{
            res.status(404).send('No se encontro el grupo a borrar ' + error)
        })
    },

    addUserToGroup : (req,res)=>{ 
        let idGroup = req.params.idGroup
        let email = req.body.email
        User.findOne({email: email})
        .then(user=>{
            Group.findById(idGroup)
            .then(grupo =>{
                if(grupo.arrUsers.includes(user._id)){
                    res.status(400).send('Ya esta agregado el usuario al grupo');
                }
                else{
                    grupo.arrUsers.push(user._id)
                    grupo.save()
                    .then(grupo => {  
                        Channel.updateMany({_id: {$in: grupo.arrChannels}},{$push:{arrMembers:user._id}},{new:true})
                        .then(channel =>{
                            audioChannel.updateMany({_id: {$in: grupo.arrAudioChannels}},{$push:{arrMembers:user._id}},{new:true})
                            .then(audiochannel =>{
                                User.findByIdAndUpdate(user._id,{$push:{arrGroups:grupo._id}}, { new : true })
                                .then(user =>{
                                    console.log(user);
                                    res.status(200).type("application/json").json(user);
                                })
                                .catch(error =>{
                                    res.status(400).send('No te pudiste unir' + error);
                                })
                            })
                            .catch(error =>{
                                res.status(500).send('Error al actualizar canales de audio')
                            })
                        })
                        .catch(error =>{
                            res.status(500).send('Error al actualizar canales de texto');
                        })
                           
                    })
                    .catch(error =>{
                        res.status(400).send('No te pudieron agregar '+error );
                    })
                }
            })
            .catch(error =>{
                res.status(404).send('No se encontró al grupo ' +error);
            })
        })
        .catch(error =>{
            res.status(404).send('No se encontró al usuario ' + error );
        })
    },


    removeUserFromGroup: (req,res)=>{

        let idGroup = req.params.idGroup
        let email = req.body.email
        User.findOne({email: email})
        .then(user=>{
            Group.findById(idGroup)
            .then(grupo =>{
                if(grupo.arrUsers.includes(user._id)){
                    //Si un canal del grupo contiene al usuario a eliminar, quitarlo
                    Channel.updateMany({arrMembers: user._id,  _id: {$in: grupo.arrChannels}} ,{$pull:{arrMembers:user._id}},{new:true})
                    .then(channel =>{
                        //Tambien eliminarlo de los canales de audio 
                        audioChannel.updateMany({arrMembers: user._id, _id: {$in: grupo.arrAudioChannels}},{$pull:{arrMembers:user._id}},{new:true})
                        .then(audiochannel =>{
                            User.findByIdAndUpdate(user._id,{$pull:{arrGroups:grupo._id}}, { new : true })
                            .then(user =>{
                                index = grupo.arrUsers.indexOf(user._id);
                                grupo.arrUsers.splice(index,1);
                                grupo.save()
                                .then(grupo=>{
                                    res.status(200).type("application/json").json(user);
                                })
                                .catch(error =>{
                                    res.status(400).send("Error al eliminar al usuario de la lista del grupo")
                                })

                            })
                            .catch(error =>{
                                res.status(400).send('No te pudiste unir' + error);
                            })
                        })
                        .catch(error =>{
                            res.status(500).send('Error al actualizar canales de audio '+error)
                        })
                    })
                    .catch(error =>{
                        res.status(500).send('Error al actualizar canales de texto '+error);
                    })
                }
                else{
                    res.status(400).send('El usuario no forma parte del grupo ');
                }
            })
            .catch(error =>{
                res.status(404).send('No se encontró al grupo ' +error);
            })
        })
        .catch(error =>{
            res.status(404).send("No se encontró el usuario con el email "+ email + " "+error );
        })
    },

    getGroup: (req,res)=>{ 
        Group.findById(req.params.idGroup)
            .populate("arrUsers")
            .populate("arrAdmins")
            .populate("arrChannels")
            .populate("arrAudioChannels")
            .then(grupo =>{
                res.status(200).send(grupo)
            })
            .catch(error =>{
                res.status(404).send('No se encontro ese grupo')
            })
    },
    
    changeGroupName: (req,res)=>{ 

        // object = { //forma del objeto que traera el body 
        //     UserInfo: {
        //         idUser:'el id de este men ',
        //         token:'token'
                   //atributos extra que para esto no van a importar 
        //     },
        //     groupInfo:{
        //         title:'tituloGrupo'
        //     }
        // }
        let idUser = req.body.UserInfo.idUser //usuario con el que esta iniciada la sesion actualmente 
        let idGroup = req.params.idGroup
        let newTitle = req.body.groupInfo.title //titulo nuevo que tendrá el grupo 

        //verficar si en ese group el usuario es admin
        Group.findById(idGroup)
        .then(group => {

            console.log(group.arrAdmins);
            console.log(idUser);
            if (group.arrAdmins.includes(idUser)){ //si esta en arreglo de administradores
                //se hace el cambio de nombre 
                Group.findByIdAndUpdate(idGroup,{title:newTitle},{ new : true })
                .then(updatedGroup => {
                    res.status(200).type("application/json").json(updatedGroup)
                })
                .catch(error =>{
                    res.status(400).send('No pudo modificarse el nombre del grupo')
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

module.exports = GroupController