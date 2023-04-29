const {Schema, model} = require('mongoose')
const bcrypt = require('bcrypt');

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
    image: {
        type: String,
        required: true,
        default: "noimage"
    },
    
    arrGroups: {
        type: [{
            type: Schema.ObjectId,
            ref: "groups"
        }],
        required: true
    },

    arrFriends: {
        type: [{
            type: Schema.ObjectId,
            ref: "users"
        }],
        required: true
    },

    arrRequestsSent: {
        type: [{
            type: Schema.ObjectId,
            ref: "requests"
        }],
        required: true
    },

    arrRequestsReceived: {
        type: [{
            type: Schema.ObjectId,
            ref: "requests"
        }],
        required: true
    },

    arrDirectMessages: {
        type: [{
            type: Schema.ObjectId,
            ref: "channels"
        }],
        required: true
    }

});



userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});


module.exports = model('users',userSchema);