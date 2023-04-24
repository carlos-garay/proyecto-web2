const Message = require('../models/messages')
const Channel = require('../models/channels')
//para estar aqui ya pase por groups/:idGroup/channels/:idChannel/messages

const MessageController = {
    crearMensaje : (req,res) =>{
        //dentro del request hay 2 objetos, el user que tenemos, y el mensaje que queremos crear 
        let object = req.body //trae ambos

        // object = { //forma del objeto que traera el body 
        //     UserInfo: {
        //         idUser:'el id de este men ',
        //         token:'token'
                    //atributos extra que para esto no van a importar 
        //     },
        //     messageInfo:{
        //         content:'contenido epico'
        //     }
        // }

        let temp = { //este objeto es el que va a mandarse a mongo
            sender: object.UserInfo.idUser,
            content: object.messageInfo.content,
            idChannel: req.params.idChannel
        }

        Message.create(temp) //mandamos crear mensaje con el objeto anterior
            .then(response => { //response aqui es el mensaje creado
                //si ya tengo el mensaje creado
                let idNewMessage = response._id 
                
                //insertarlo al arrMessages del textChannel al que pertenece 
                //modificar channel al que pertenece 
                Channel.findByIdAndUpdate(req.params.idChannel,{$push:{arrMessages:idNewMessage}},{new : true})
                    .then(canal =>{
                        res.status(200).send(response)
                    })
                    .catch(error =>{
                        res.status(400).send('No se pudo agregar mensaje al canal')
                    })
            })
            .catch(error =>{
                res.status(400).send('no se pudo crear/guardar el mensaje ')
            })
    }
}

module.exports = MessageController