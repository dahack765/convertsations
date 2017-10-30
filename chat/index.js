var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var num_users = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  num_users++;

  
  console.log('User Number', "User #" + num_users + " has joined.");
  console.log('a user connected');

  socket.on('disconnect', function(){
  	num_users --;
    console.log('user disconnected' + num_users);
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
