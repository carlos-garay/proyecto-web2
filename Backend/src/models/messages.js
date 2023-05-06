const {Schema,model} = require('mongoose')

const messageSchema = new Schema ({
    sender: {type: String, required:true},
    dateTime: {type: Date,default: Date.now}, //no se manda como parametro en el body 
    //                                          al crear para que se utilice el default
    content: {type: String, required:true}, //va a traer el contenido del mensaje, provicionalmente solamente sera una string 
    idChannel: {type: String, required:true} //redundancia para saber a que canal pertenece, tal vez no se utilice 
});

module.exports = model('messages',messageSchema) 