//mio
const {Schema,model} = require('mongoose')

const groupSchema = new Schema ({
    titulo: {type: String,required:true},
    imagen: {type: String,required:true},
    arrUsers: [{type: String,required:true}],
    arrAdmins: [{type: String,required:true}],
    arrChannels: [{type: String,required:true}]
});

module.exports = model('groups',groupSchema) 
