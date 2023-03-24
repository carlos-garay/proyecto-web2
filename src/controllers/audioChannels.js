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
                res.status(200).send(`Se agregó el canal de audio ${channel._id} al grupo  ${group.titulo}`);
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
                res.status(200).send(`Se eliminó el canal de audio ${idChannel} del grupo  ${group.titulo}`);
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
    }

}

module.exports = audioChannelController