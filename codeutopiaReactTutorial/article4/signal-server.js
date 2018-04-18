var WebsocketServer = require('ws').Server;
 
var server = new WebsocketServer({ port: 3210 });
// when a new client connects, set a message listener for message events 
// and send the msg to all WS clients (apart from itself). 
server.on('connection', function(socket) {
  socket.on('message', function(msg) {
    server.clients.forEach(function(other) {
      if(other === socket) {
        return;
      }
 
      other.send(msg);
    });
  });
});
