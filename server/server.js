const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var {genMess,genLocMessage} = require('./utils/message');

var {isRealString} = require('./utils/validation.js');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMess',genMess('Admin','Welcome to our Chat group'));

  socket.broadcast.emit('newMess',genMess('Admin','new user join'));

socket.on('join',(param,callback)=>{
console.log('param',param);
console.log('userName',isRealString(param.userName),'roomName:',isRealString(param.roomName));
console.log('type:',typeof(param.userName));
if (!isRealString(param.userName)||!isRealString(param.roomName)) {
  callback('U should Enter userName and also room name');
}
callback();
})

  socket.on('createMess', (test,callback) => {
    console.log('server User Data',test);
    io.emit('newMess',genMess(test.from,test.text));
    callback('send from server info.');
  });

  socket.on('sendCordinates', function(test) {
    console.log('test',test);
    console.log('ddd',genMess(test.lat,test.lang));
    io.emit('genLocMess',genLocMessage('Admin',test.lat,test.lang));

  });





  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
