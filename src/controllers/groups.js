const Group = require('../models/groups')
const User = require('../models/users');
const audioChannel = require('../models/audioChannels')
const Channel = require('../models/channels')
const Message = require('../models/messages')

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
        let creatorId = body.UserInfo.idUser //camarada que lo esta forjando, viene en req
        let object = {
            title:body.groupInfo.title,
            //sin imagen por ahora, default la pone vacia 
            arrUsers:[creatorId],
            arrAdmins:[creatorId],
            arrChannels:[],
            arrAudioChannels:[]
        }
        console.log(object)
        console.log("\n\nOtra cosa")
        Group.create(object)
            .then(newGroup => {
                console.log(newGroup);
                //obtener y modificar el usuario agregando el newGroup a la lista de grupos 
                User.findByIdAndUpdate(creatorId,{$push:{arrGroups:newGroup._id}}, { new : true })
                    .then(user => {
                        res.status(200).send(`el usuario ${user.name} ha creado el grupo ${newGroup.title}`)
                    })
                    .catch(error => {
                        res.status(400).send('No pudo agregarse el grupo a la lista del usuario')
                    })
            })
            .catch(error =>{
                res.status(400).send('No pudo crearse el nuevo grupo ' + error)
            })
    },


    //TIENE ERROR EN ESTE MOMENTO, VAMOS A HACER UN REFACTOR A USAR PULL ALL PARA ELIMINAR EN LUGAR DE LOS FOR
    
    deleteGroup : (req,res)=>{ // borrar el grupo de todos los arreglos de los usuarios, 
        Group.findByIdAndDelete(req.params.idGroup)
            .then(grupo =>{
                //ya quitamos el grupo de los arreglos de los usuarios 
                for(let usuario in grupo.arrUsers){
                    //de cada usuario que pertenecia al grupo, vamos a eliminar el grupo de su arrGroups
                    User.findByIdAndUpdate(usuario,{ $pull: { arrGroups: grupo._id}}, { new : true })
                        .then(user => {

                        })
                        .catch(error =>{
                            res.status(400).send('error al encontrar el usuario para eliminar grupo de su ARR')
                        })
                }
                // eliminar canales de audio, se podría hacer tambien con deleteMany
                for(let canalAudio in grupo.arrAudioChannels){
                    audioChannel.findByIdAndDelete(canalAudio)
                        .then(canal => {

                        })
                        .catch(error => {
                            res.status(400).send(`no se pudo eliminar canal de audio ${canalAudio}`)
                        })
                }
                for(let canalTexto in grupo.arrChannels){
                    Channel.findByIdAndDelete(canalTexto)
                        .then(removedChannel =>{
                            //borrar todos los mensajes que estan en el arreglo 
                            Message.deleteMany({ _id: { $in: removedChannel.arrMessages}})
                                .then(
                                    res.status(200).send('se borro todo exitosamente')
                                )
                                .catch(error => {
                                    res.status(400).send('error al eliminar los mensajes del canal')
                                })
                        })
                        .catch(error => {
                            res.status(400).send('error al eliminar los canales de texto')
                        })
                }
            })
            .catch(error =>{
                res.status(404).send('No se encontro el grupo a borrar')
            })
    },
    addUserToGroup : (req,res)=>{ 
        let idGroup = req.params.idGroup
        let idUser = req.body.idUser
        Group.findByIdAndUpdate(idGroup,{$push:{arrUsers:idUser}}, { new : true })
            .then(grupo => {
                User.findByIdAndUpdate(idUser,{$push:{arrGroups:grupo._id}}, { new : true })
                    .then(user =>{
                        console.log(user);
                        res.status(200).send(`el usuario ${user.name} se unio al grupo ${grupo.title}`)
                    })
                    .catch(error =>{
                        res.status(400).send('No te pudiste unir' + error)
                    })
            })
            .catch(error =>{
                res.status(400).send('No te pudieron agregar')
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
                Group.findByIdAndUpdate(idGroup,{title:newTitle},{ new : true })
                    .then(updatedGroup => {
                        res.status(200).send(`se ha cambiado el nombre del grupo a ${updatedGroup.title}`)
                    })
                    .catch(error =>{
                        res.status(400).send('No pudo modificarse el nombre del grupo')
                    })

                // FALTA VERIFICAR QUE SEA EL ADMIN, NO FUNCIONA EL IN
                // console.log(group.arrAdmins)
                // console.log(idUser);
                // if (idUser in group.arrAdmins){ //si esta en arreglo de administradores
                //     //se hace el cambio de nombre 
                //     Group.findByIdAndUpdate(idGroup,{title:newTitle},{ new : true })
                //         .then(updatedGroup => {
                //             res.status(200).send(`se ha cambiado el nombre del grupo a ${updatedGroup.title}`)
                //         })
                //         .catch(error =>{
                //             res.status(400).send('No pudo modificarse el nombre del grupo')
                //         })
                // }
                // else{
                //     res.status(401).send('No tienes permisos para cambiar el nombre')
                // }
            })
            .catch(error => {
                res.status(404).send('No se encontro ese grupo')
            })
    }
}

module.exports = GroupController