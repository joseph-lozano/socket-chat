var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('is typing', function(usr){
    io.emit('is typing', usr)
  })
  socket.on('user joined', function(name){
    io.emit('user joined', name)
  })
});


var port = process.env.PORT || 5000

http.listen(port, function(){
  console.log('listening on *:', port);
});

