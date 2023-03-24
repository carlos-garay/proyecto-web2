//mio
const {Schema,model} = require('mongoose')

const groupSchema = new Schema ({
    titulo: {type: String,required:true},
    imagen: {type: String,required:true},
    arrUsers: {
        type: [{
            type: Schema.ObjectId,
            ref: "users"
        }],
        required:true
    },
    arrAdmins: {
        type: [{
            type: Schema.ObjectId,
            ref: "users"
        }],
        required:true
    },
    arrChannels: {
        type: [{
            type: Schema.ObjectId,
            ref: "channels"
        }],
        required:true
    }
});

module.exports = model('groups',groupSchema) 
