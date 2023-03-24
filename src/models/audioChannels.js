const {Schema, model} = require('mongoose')

const audioChannelSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: "nuevo canal de texto"
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
    }
});


module.exports = model('audioChannels',audioChannelSchema);