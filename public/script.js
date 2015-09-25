var name = ""
var socket = io();

$('#name-input').submit(function(){
  name = $('#n').val();
  $('#n').val('');
  $('#name-input').css('display', 'none')
  $('#chat-box').css('display', 'block')
  socket.emit('user joined', name);
  return false
})

$('#chat-box').submit(function(){
  msg = $('#m').val()
  socket.emit('chat message', {message: msg, name: name});
  $('#m').val('');
  return false;
});

socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg.name + ": " + msg.message));
});

socket.on('user joined', function(name){
  $('#messages').append($('<li>').text(name + " has joined the chat!"))
})

socket.on('user left', function(name){
  $('#messages').append($('<li>').text(name + " has left the chat"))
})

// $('#m').on('input', function(){
//   socket.emit('is typing', "user");
// })
// socket.on('is typing', function(usr){
//   console.log('is typing')
//   $('#messages').append($('<li>').text("User is Tpying"))
// })