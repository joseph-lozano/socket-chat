var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  var user = {};
  socket.on('disconnect', function(){
    io.emit('user left', user.name)
    console.log(user.name, 'disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('is typing', function(usr){
    io.emit('is typing', usr)
  })
  socket.on('user joined', function(name){
    console.log(name, 'connected');
    io.emit('user joined', name)
    user.name = name
  })
});


var port = process.env.PORT || 5000

http.listen(port, function(){
  console.log('listening on *:', port);
});

