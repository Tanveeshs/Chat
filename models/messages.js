const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    from:String,
    message:String,
    Time:{
        type:Date,
        default:Date.now()
    }
})

module.exports.messageSchema = messageSchema
module.exports.messageModel = mongoose.model('Messages',messageSchema)
