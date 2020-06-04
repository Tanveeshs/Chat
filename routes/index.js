var express = require('express');
var router = express.Router();
const chat = require('../models/chat')
const message = require('../models/messages')
/* GET home page. */
router.get('/chats/:user', function(req, res, next) {
  const user = req.params.user;
  console.log(user)
  chat.find({$or:[{buyer:user},{seller:user}]},function (err,result) {
    if(result.length == 0) {
      res.send('Chats not found')
    }
    else {

      userMessages = []
      otherMessages = []
      result[0].messages.forEach(function (message) {
        if(message.from == user)
          userMessages.push({message:message.message,time:message.Time})
        else
          otherMessages.push({message:message.message,time:message.Time})
      })
      console.log(userMessages)
      console.log(otherMessages)
      res.send('Done')

    }

  })

});

router.post('/send',function (req,res) {
  const mess = req.body.message;
  const user = req.body.user;
  const to = req.body.sendTo;
  chat.find({$or:[{buyer:user,seller:to},{buyer:to,seller: user}]},function (err,result) {
      if(result.length==0) {
        const c1 = new chat()
        c1.buyer = user;
        c1.seller = to;
        const m = new message.messageModel();
        m.from = user;
        m.message = mess;
        m.save()
        c1.messages.push(m);
        c1.save()
        console.log('No chat')
      }
      else {
        console.log('Chat Found')
        const m = new message.messageModel();
        m.from = user;
        m.message = mess;
        m.save()
        result[0].messages.push(m);
        result[0].save()
      }

  }
  )
  res.send('Done')


})

module.exports = router;
