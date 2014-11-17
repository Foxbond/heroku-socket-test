var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

var port = 80;//process.env.PORT || 6000;

http.listen(port, function(){
  console.log('listening on *:'+port);
});

io.on('connection', function(socket){
//console.log('user connected');

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


