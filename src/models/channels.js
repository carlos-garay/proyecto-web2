const {Schema, model} = require('mongoose')

const channelSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: "Nuevo canal"
    },
    arrMembers: {
        type: [{
            type: Schema.ObjectId,
            ref: "users"
        }],
        required: true
    },
    private: { 
        type: Boolean, 
        required: true,
        default: false
    },
    arrMessages: {
        type: [{
            type: Schema.ObjectId,
            ref: "messages"
        }],
        required: true
    }
});


module.exports = model('channels',channelSchema);