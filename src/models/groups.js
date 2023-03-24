//mio
const {Schema,model} = require('mongoose')

const groupSchema = new Schema ({
    title: {type: String,required:true},
    image: {type: String,required:true,default:''},
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
    },
    arrAudioChannels: {
        type: [{
            type: Schema.ObjectId,
            ref: "audioChannels"
        }],
        required:true
    }
});

module.exports = model('groups',groupSchema) 
