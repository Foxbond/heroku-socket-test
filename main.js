var express = require('express');
var http = require('http');
var sio = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = sio.listen(server);

io.set("origins","*:*");

server.listen(process.env.PORT || 80, function (){
	var addr = server.address();
	console.log('App listening '+JSON.stringify(addr));
});

/*
var allowCrossDomain = function(req, res, next) {
  var allowedOrigins, origin;
  allowedOrigins = ["http://localhost", "http://foxclick.heroku.com"];
  origin = req.header("Origin");
  if (allowedOrigins.indexOf(origin) >= 0) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
  }
  return next();
}; */

app.use(allowCrossDomain);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
console.log("user connected");

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
