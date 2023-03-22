//mio
const {Schema,model} = require('mongoose')

const requestSchema = new Schema ({
    sender: {type: String, required:true},
    receiver: {type: String, required:true},
    status: {type: Number, default:0}
});

module.exports = model('requests',requestSchema) 
