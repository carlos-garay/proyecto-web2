const audioChannel = require('../models/audioChannels')
const Group = require('../models/groups')

const audioChannelController = {

    createAudioChannel: (req,res)=>{
        console.log(req.params)
        let idGroup = req.params.idGroup;
        let channelBD = audioChannel(req.body);
        channelBD.save().then(channel => {
            //Intentamos asignar el _id del canal al arreglo de canales de audio del grupo
            Group.findByIdAndUpdate(idGroup, {$push:{arrAudioChannels: channel._id}}, { new : true }).then(group => {
                res.status(200).send(`Se agregó el canal de audio ${channel._id} al grupo  ${group.title}`);
            })
            .catch(err => {
                //Si no se puedo guardar al grupo el canal, hay que eliminarlo de la base de datos de canales
                audioChannel.findByIdAndDelete(channel._id);
                res.status(404).send("No se encontró el grupo con el id: "+ idGroup);
                
            });
        })
        .catch(err =>{
            res.status(500).send("Error en el servidor " + err);
        })
    },

    deleteAudioChannel: (req,res)=>{
        let idGroup = req.params.idGroup;
        let idChannel = req.params.idChannel;
        Group.findByIdAndUpdate(idGroup,{$pull:{arrAudioChannels: idChannel}}).then(group => {
            audioChannel.findByIdAndDelete(idChannel).then(channel => {
                res.status(200).send(`Se eliminó el canal de audio ${idChannel} del grupo  ${group.title}`);
            })
            .catch(err =>{
                res.status(404).send("No se encontró el canal de audio con el id: "+ idChannel)});
        })
        .catch(err => {
            res.status(404).send("No se encontró el grupo con el id: "+ idGroup);
        })
    },

    addMemberToAudioChannel: (req,res)=>{
        let arrayNewMembers = req.body.arrMembers;
        let idChannel = req.params.idChannel;
        let idGroup = req.params.idGroup;
        console.log(arrayNewMembers);
        audioChannel.findByIdAndUpdate(idChannel, {$addToSet:{arrMembers:{$each: arrayNewMembers}}}, { new : true }).then(channel => {
            res.status(200).send(`Se agregaron miembros al canal de audio ${channel._id} del grupo  ${idGroup}`);
        })
        .catch(err => {
            res.status(404).send("No se encontró el canal de audio con el id: "+ idChannel);
            
        });
    },

    removeMemberFromAudioChannel: (req,res)=>{
        let arrayDeleteMembers = req.body.arrMembers;
        let idChannel = req.params.idChannel;
        let idGroup = req.params.idGroup;
        console.log(arrayDeleteMembers);
        audioChannel.findByIdAndUpdate(idChannel, {$pullAll:{arrMembers:arrayDeleteMembers}}, { new : true }).then(channel => {
            res.status(200).send(`Se eliminaron miembros del canal de audio ${channel._id} del grupo  ${idGroup}`);
        })
        .catch(err => {
            res.status(404).send("No se encontró el canal de audio con el id: "+ idChannel + err);
        });
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

module.exports = audioChannelController