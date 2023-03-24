const Group = require('../models/groups')
const User = require('../models/users');

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
        let creatorId = body.UserInfo //camarada que lo esta forjando, viene en req
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
                //obtener y modificar el usuario agregando el newGroup a la lista de grupos 
                User.findByIdAndUpdate(creatorId,{$push:{arrGroups:newGroup.id}}, { new : true })
                    .then(user => {
                        res.status(200).send(`el usuario ${user.name} ha creado el grupo ${newGroup.title}`)
                    })
                    .catch(error => {
                        res.status(400).send('No pudo agregarse el grupo a la lista del usuario')
                    })
            })
            .catch(error =>{
                res.status(400).send('No pudo crearse el nuevo grupo ')
            })
    },
    deleteGroup : (req,res)=>{ //monstruosity, borrar el grupo de todos los arreglos de los usuarios, 
        //borrar todos los canales pertenecientes al grupo
        //borrar los mensajes pertenecientes a los canales de texto 

        //
        //deleteMany $in

    },
    addUserToGroup : (req,res)=>{ //free, viene del put 
        let idGroup = req.params.idGroup
        let idUser = body.idUser
        Group.findByIdAndUpdate(idGroup,{$push:{arrUsers:idUser}}, { new : true })
            .then(grupo => {
                User.findByIdAndUpdate(idUser,{$push:{arrGroups:grupo.id}}, { new : true })
                    .then(user =>{
                        res.status(200).send(`el usuario ${user.name} se unio al grupo ${grupo.title}`)
                    })
                    .catch(error =>{
                        res.status(400).send('No te pudiste unir')
                    })
            })
            .catch(error =>{
                res.status(400).send('No te pudieron agregar')
            })
    },
    getGroup: (req,res)=>{ //maso ocupa populate
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
    changeGroupName: (req,res)=>{ //free

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
        let body = req.body
        let idUser = body.UserInfo.idUser //usuario con el que esta iniciada la sesion actualmente 
        let idGroup = req.params.idGroup
        let newTitle = req.body.groupInfo.title //titulo nuevo que tendrá el grupo 

        //verficar si en ese group el usuario es admin
        Group.findById(idGroup)
            .then(group => {
                if (idUser in group.arrAdmins){ //si esta en arreglo de administradores
                    //se hace el cambio de nombre 
                    Group.findByIdAndUpdate(idGroup,{title:newTitle},{ new : true })
                        .then(updatedGroup => {
                            res.status(200).send(`se ha cambiado el nombre del grupo a ${updatedGroup.title}`)
                        })
                        .catch(error =>{
                            res.status(400).send('No pudo modificarse el nombre del grupo')
                        })
                } 
                res.status(401).send('No tienes permisos para cambiar el nombre')
            })
            .catch(error => {
                res.status(404).send('No se encontro ese grupo')
            })
    }
}

module.exports = GroupController