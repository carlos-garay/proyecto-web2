const {Schema, model} = require('mongoose')

const channelSchema = new Schema({
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
    },
    arrMessages: {
        type: [String],
        required: true
    }
});


module.exports = model('channels',channelSchema);