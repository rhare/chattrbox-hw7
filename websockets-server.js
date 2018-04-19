var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];
var topic = '';

var do_command = function (command, data) {
  var cstr = data.message.replace(command, '').trim();
  var message = null;
  if (command == '/topic') {
    topic = cstr;
    var m = '*** Topic has changed to \'' + topic + '\'';
    data.message = m;
    message = JSON.stringify(data);
  } else {
    message = JSON.stringify(data);
    messages.push(message);
  }

  // Send message if needed.
  if (message != null) {
    ws.clients.forEach(function (clientSocket) {
      clientSocket.send(message);
    });
  }
};

console.log('websockets server started');

ws.on('connection', function (socket) {
  console.log('client connection established');
  var m = '*** Topic is \'' + topic + '\'';
  var message = JSON.stringify({message: m});
  socket.send(message);

  messages.forEach(function (msg) {
    socket.send(msg);
  });

  socket.on('message', function (data) {
    console.log('message received: ' + data);
    var payload = JSON.parse(data);
    if (payload.message.startsWith('/')) {
      var command = payload.message.split(/\s+/)[0];
      do_command(command, payload);
    } else {
      messages.push(data);
      ws.clients.forEach(function (clientSocket) {
        clientSocket.send(data);
      });
    }
  });
});
