const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: { //Recordar encriptar en el futuro
        type: String,
        required: true
    },
    token: { //A implementar en el futuro
        type: String, 
        required: true,
        default: "undefined"
    },
    //También contará con foto de perfil ya que se determine como se manejarán las imágenes
    
    arrGroups: {
        type: [String],
        required: true
    },

    arrFriends: {
        type: [String],
        required: true
    },

    arrRequestsSent: {
        type: [String],
        required: true
    },

    arrRequestsReceived: {
        type: [String],
        required: true
    }

});


module.exports = model('users',userSchema);