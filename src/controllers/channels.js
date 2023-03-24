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
                res.status(200).send(`Se agregó el canal ${channel._id} al grupo  ${group.titulo}`);
            })
            .catch(err => {
                //Si no se puedo guardar al grupo el canal, hay que eliminarlo de la base de datos de canales
                Group.findByIdAndDelete(idGroup);
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
        Group.findByIdAndUpdate(idGroup,{$pull:{arrChannel: idChannel}}).then(channel => {
            Exam.findOneAndDelete({ _idExam: `${idExam}` }).then(exam => {
                res.status(200).send(`Se eliminó el examen ${idExam} del usuario  ${idUser}`);
            })
            .catch(err =>{
                res.status(404).send("No se encontró el examen con el id: "+idExam)});
        })
        .catch(err => {
            res.status(404).send("No se encontró el usuario con el id: "+idUser);
        })
    }
}

module.exports = ChannelController