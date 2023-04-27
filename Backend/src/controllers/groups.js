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

    
    deleteGroup : (req,res)=>{ 
        let idUser = req.headers.user
        Group.findById(req.params.idGroup)
        .then(grupo =>{
            if(grupo.arrAdmins.includes(idUser)){
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
        
                    // eliminar canales de audio
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
            }else{
                res.status(403).send('No eres administrador del grupo')
            }

        })
        .catch(error =>{
            res.status(404).send('No se encontro el grupo a borrar ' + error);
        })
       
    },

    addUserToGroup : (req,res)=>{ 
        let idGroup = req.params.idGroup
        let email = req.body.email
        let idAdmin = req.headers.user
        User.findOne({email: email})
        .then(user=>{
            Group.findById(idGroup)
            .then(grupo =>{
                if(grupo.arrAdmins.includes(idAdmin)){
                    if(grupo.arrUsers.includes(user._id)){
                        res.status(400).send('Ya esta agregado el usuario al grupo');
                    }
                    else{
                        grupo.arrUsers.push(user._id)
                        grupo.save()
                        .then(grupo => {  
                            Channel.updateMany({_id: {$in: grupo.arrChannels}},{$push:{arrMembers:user._id}},{new:true})
                            .catch(error =>{
                                res.status(500).send('Error al actualizar canales de texto '+error);
                            })
                            audioChannel.updateMany({_id: {$in: grupo.arrAudioChannels}},{$push:{arrMembers:user._id}},{new:true})
                            .catch(error =>{
                                res.status(500).send('Error al actualizar canales de audio '+error)
                            })

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
                            res.status(400).send('No te pudieron agregar '+error );
                        })
                    }
                }
                else{
                    res.status(403).send('No eres administrador del grupo')
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
        let idAdmin = req.headers.user

        User.findOne({email: email})
        .then(user=>{
            Group.findById(idGroup)
            .then(grupo =>{
                if(grupo.arrAdmins.includes(idAdmin)){

                    if(grupo.arrUsers.includes(user._id)){
                        //Si un canal del grupo contiene al usuario a eliminar, quitarlo
                        Channel.updateMany({arrMembers: user._id,  _id: {$in: grupo.arrChannels}} ,{$pull:{arrMembers:user._id}},{new:true})
                        .catch(error =>{
                            res.status(500).send('Error al actualizar canales de texto '+error);
                        })
                        //Tambien eliminarlo de los canales de audio 
                        audioChannel.updateMany({arrMembers: user._id, _id: {$in: grupo.arrAudioChannels}},{$pull:{arrMembers:user._id}},{new:true})
                        .catch(error =>{
                            res.status(500).send('Error al actualizar canales de audio '+error)
                        })
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

                    }
                    else{
                        res.status(400).send('El usuario no forma parte del grupo ');
                    }
                }
                else{
                    res.status(403).send('No eres administrador del grupo')
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


    makeUserAdmin: (req,res)=>{
        let idGroup = req.params.idGroup
        let idToAdmin = req.body._id
        let idAdmin = req.headers.user

        User.findById(idAdmin)
        .then(user=>{
            Group.findById(idGroup)
            .then(grupo =>{
                //Solo un usuario administrador puede hacer administrador a otro
                if(grupo.arrAdmins.includes(idAdmin)){
                    //Si el usuario ya es admin no se agrega de nuevo al arreglo de administradores
                    if(!grupo.arrAdmins.includes(idToAdmin)){
                        grupo.arrAdmins.push(idToAdmin)
                        grupo.save()
                        .then(grupo =>{
                            res.status(200).send("El usuario se ha vuelto administrador del grupo")
                        })
                        .catch(error =>{
                            res.status(500).send("error al hacer al usuario administrador");
                        })
                    }
                    else{
                        res.status(400).send('El usuario ya es administrador');
                    }
                }
                else{
                    res.status(403).send('No eres administrador del grupo')
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


    revokeUserAdmin: (req,res)=>{
        let idGroup = req.params.idGroup
        let idRevokeAdmin = req.body._id
        let idAdmin = req.headers.user

        User.findById(idAdmin)
        .then(user=>{
            Group.findById(idGroup)
            .then(grupo =>{
                //Solo un usuario administrador puede quitar las propiedades de administrador a otro
                if(grupo.arrAdmins.includes(idAdmin)){
                    //Si el usuario estaba en la lista de administradores se le quita este permiso 
                    if(grupo.arrAdmins.includes(idRevokeAdmin)){
                        index = grupo.arrAdmins.indexOf(user._id);
                        grupo.arrAdmins.splice(index,1);
                        grupo.save()
                        .then(grupo =>{
                            res.status(200).send("El usuario se ha vuelto administrador del grupo")
                        })
                        .catch(error =>{
                            res.status(500).send("error al hacer al usuario administrador");
                        })
                    }
                    else{
                        res.status(400).send('El no era administrador');
                    }
                }
                else{
                    res.status(403).send('No eres administrador del grupo')
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
        let idUser = req.headers.user
        Group.findById(req.params.idGroup)
            .populate("arrUsers","-password")
            .populate("arrAdmins","-password")
            .populate("arrChannels")
            .populate("arrAudioChannels")
            .then(grupo =>{
                if(grupo.arrUsers.find(({_id}) => _id == idUser)){
                    res.status(200).send(grupo)
                }
                else{
                    res.status(403).send('No perteneces a este grupo')
                }

            })
            .catch(error =>{
                res.status(404).send('No se encontro ese grupo '+error)
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
                res.status(403).send('No tienes permisos para cambiar el nombre')
            }
        })
        .catch(error => {
            res.status(404).send('No se encontro ese grupo')
        })
    }
}

module.exports = GroupController