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
    password: {
        type: String,
        required: true
    },
    token: {
        type: String, 
        required: true,
        default: "undefined"
    },
    arrExam: {
        type: [String],
        required: true
    }
});


module.exports = model('users',userSchema);