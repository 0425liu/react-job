let express = require('express');
const bodyParser = require('body-parser')//解析post过来的参数
const cookieParser = require('cookie-parser')
const userRouter = require('./user')
const model = require('./model')
const Chat = model.getModle('chat')
let app = express();
//work with express
const server = require('http').Server(app)

const io = require('socket.io')(server)

io.on('connection', function (socket) {
  socket.on('sendmsg', function (data) {
    const { from, to, msg } = data;
    const chatid = [from, to].sort().join('_')
    Chat.create({ chatid, from, to, content: msg, create_time: new Date().getTime() }, function (err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })

  })
})



app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)


server.listen(9093, function () {
  console.log('listen start')
})