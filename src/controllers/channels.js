const Channel = require('../models/channels')
const Group = require('../models/groups')

const ChannelController = {

    createChannel: (req,res)=>{
        console.log(req.params)
        let idGroup = req.params.idGroup;
        let channelBD = Channel(req.body);
        channelBD.save().then(channel => {
            //Intentamos asignar el _id del canal al arreglo de canales del grupo
            Group.findByIdAndUpdate(idGroup, {$push:{arrChannels: channel._id}}, { new : true }).then(group => {
                res.status(200).send(`Se agregó el canal de audio ${channel._id} al grupo  ${group.titulo}`);
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
    },

    deleteChannel: (req,res)=>{
        let idGroup = req.params.idGroup;
        let idChannel = req.params.idChannel;
        Group.findByIdAndUpdate(idGroup,{$pull:{arrChannels: idChannel}}).then(group => {
            Channel.findByIdAndDelete(idChannel).then(channel => {
                res.status(200).send(`Se eliminó el canal ${idChannel} del grupo  ${group.titulo}`);
            })
            .catch(err =>{
                res.status(404).send("No se encontró el canal con el id: "+ idChannel)});
        })
        .catch(err => {
            res.status(404).send("No se encontró el grupo con el id: "+ idGroup);
        })
    },

    addMemberToChannel: (req,res)=>{
        let arrayNewMembers = req.body.arrMembers;
        let idChannel = req.params.idChannel;
        let idGroup = req.params.idGroup;
        console.log(arrayNewMembers);
        Channel.findByIdAndUpdate(idChannel, {$addToSet:{arrMembers:{$each: arrayNewMembers}}}, { new : true }).then(channel => {
            res.status(200).send(`Se agregaron miembros al canal ${channel._id} del grupo  ${idGroup}`);
        })
        .catch(err => {
            res.status(404).send("No se encontró el canal con el id: "+ idChannel + err);
            
        });
    },

    removeMemberFromChannel: (req,res)=>{
        let arrayDeleteMembers = req.body.arrMembers;
        let idChannel = req.params.idChannel;
        let idGroup = req.params.idGroup;
        console.log(arrayDeleteMembers);
        Channel.findByIdAndUpdate(idChannel, {$pullAll:{arrMembers:arrayDeleteMembers}}, { new : true }).then(channel => {
            res.status(200).send(`Se eliminaron miembros del canal ${channel._id} del grupo  ${idGroup}`);
        })
        .catch(err => {
            res.status(404).send("No se encontró el canal con el id: "+ idChannel + err);
            
        });
    }

}

module.exports = ChannelController