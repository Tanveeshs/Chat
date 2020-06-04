const mongoose = require('mongoose')
const message = require('./messages')
const chatSchema = new mongoose.Schema({
    buyer:String,
    seller:String,
    messages:[message.messageSchema]
})

module.exports = mongoose.model('Chats',chatSchema)
