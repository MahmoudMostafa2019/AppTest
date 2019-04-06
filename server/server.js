const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var {genMess,genLocMessage} = require('./utils/message');

var {User} = require('./utils/user');
var {isRealString} = require('./utils/validation.js');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

var user=new User();

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit('newMess',genMess('Admin','Welcome to our Chat group'));
  //
  // socket.broadcast.emit('newMess',genMess('Admin','new user join'));

socket.on('join',(param,callback)=>{
if (!isRealString(param.userName)||!isRealString(param.roomName)) {
return   callback('U should Enter userName and also room name');
}
//join room
socket.join(param.roomName);
user.removeUser(socket.id);
user.addUser(socket.id,param.userName,param.roomName);
io.to(param.roomName).emit('updateUserList',user.getUserList(param.roomName));

socket.emit('newMess',genMess('Admin','Welcome to our Chat group'));

socket.broadcast.to(param.roomName).emit('newMess',genMess('Admin',`${param.userName} join`));

callback();
})

  socket.on('createMess', (test,callback) => {
    console.log('server User Data',test);
    var getUse=user.getUser(socket.id);
    io.to(getUse.room).emit('newMess',genMess(getUse.name,test.text));
    callback('send from server info.');
  });

  socket.on('sendCordinates', function(test) {
    console.log('test',test);
    console.log('ddd',genMess(test.lat,test.lang));
    io.emit('genLocMess',genLocMessage('Admin',test.lat,test.lang));

  });





  socket.on('disconnect', () => {
    var newUser=user.removeUser(socket.id)
if (newUser) {
  io.to(newUser.room).emit('updateUserList',user.getUserList(newUser.room));
  io.to(newUser.room).emit('newMess',genMess('Admin',`${newUser.name} is left`));
}
        console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
