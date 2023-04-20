const {Schema, model} = require('mongoose')

const audioChannelSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: "nuevo canal de audio"
    },
    arrMembers: {
        type: [{
            type: Schema.ObjectId,
            ref: "users"
        }],
        required: true
    },
    arrInCall:{
        type: [{
            type: Schema.ObjectId,
            ref: "users"
        }]
    },
    private: { 
        type: Boolean, 
        required: true,
        default: false
    }
});


module.exports = model('audioChannels',audioChannelSchema);