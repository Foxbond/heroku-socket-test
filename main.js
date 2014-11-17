/*
var app = require('express')();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

var http = require('http').Server(app);

var port = process.env.PORT || 5000;

http.listen(port, function(){
  console.log('listening on *:'+port);
});




var io = require('socket.io')(http);
*************/


var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(process.env.PORT || 80, 'http://foxclick.heroku.com', function (){
	var addr = server.address();
  console.log('   app listening '+JSON.stringify(addr));
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
console.log("user connected");

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
