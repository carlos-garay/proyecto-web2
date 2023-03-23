const {Schema, model} = require('mongoose')

const audioChannelSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    arrMembers: {
        type: [String],
        unique: true,
        required: true
    },
    private: { 
        type: Boolean, 
        required: true,
        default: false
    }
});


module.exports = model('audioChannels',audioChannelSchema);