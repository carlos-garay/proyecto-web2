//mio
const {Schema,model} = require('mongoose')

const requestSchema = new Schema ({
    sender: {type: String, required:true},
    receiver: {type: String, required:true},
    status: {type: Number, default:0}, //0 es sin contestar, 1 es aceptada, 2 es rechazada
    image: {type: String, required:false}
});

module.exports = model('requests',requestSchema) 
