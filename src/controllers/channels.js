const Channel = require('../models/channels')
const Group = requuire('../models/groups')

const ChannelController = {
    deleteChannel: (req,res)=>{
        let idGroup = req.params.idGroup;
        let idChannel = req.params.idChannel;
        Group.findOneAndUpdate({_id: `${idChannel}` },{$pull:{arrChannel: idChannel}}).then(channel => {
            Exam.findOneAndDelete({ _idExam: `${idExam}` }).then(exam => {
                res.status(200).type('text/plain; charset=utf-8').send(`Se eliminó el examen ${idExam} del usuario  ${idUser}`);
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