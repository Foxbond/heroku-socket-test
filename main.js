var util = require('util');

var express = require('express');
var http = require('http');
var sio = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = sio.listen(server);


console.log('origins-> '+io.origins());
//io.set("origins","*:*");
io.origins("*:*");

server.listen(process.env.PORT || 80, function (){
	var addr = server.address();
	console.log('App listening '+JSON.stringify(addr));
});


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
console.log("user connected");

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
