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

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


var io = require('socket.io')(http);

io.on('connection', function(socket){
console.log("user connected");

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

