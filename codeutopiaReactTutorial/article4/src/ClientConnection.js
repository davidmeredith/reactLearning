
var SimplePeer = require('simple-peer');
var SimpleWebsocket = require('simple-websocket');
var EventEmitter = require('events').EventEmitter;
 
var emitter = new EventEmitter();
 
module.exports = function() {
  var socket = new SimpleWebsocket('ws://localhost:3210');
  var rtc;
  socket.on('close', function() { console.log('Socket closed'); });
  socket.on('error', function(err) { console.log('Socket error'); console.log(err); });

  // on socket connetion   
  socket.on('connect', function() {
    // immediately initiate the connection (initatior is true)   
    rtc = new SimplePeer({ initiator: true, trickle: false });
    // catch the initiation signal and pass it to the socket so a HostConnection can receive it.   
    rtc.on('signal', function(data) {
      socket.send(data);
    });

    // when we receive data from the socket, we assume it to be a response signal from the host, 
    // so we call rtc.signal(data) which establishes the connection. 
    socket.on('data', function(data) {
      rtc.signal(data);
    });

    // Unlike the host, the client uses a connect listener on the RTC connection. 
    // From this we send out a 'connected' event, which is used to fire the onReady listeners. 
    rtc.on('connect', function() {
      emitter.emit('connected');
      //we no longer need the signaler
      socket.destroy();
    });

    // Fired whenever data is received from WebRTC peer. For this, we emit
    // an event, which we'll use to setup callbacks.  
    rtc.on('data', function(message) {
      emitter.emit('message', message);
    });
  });
 
  return {
    onReady: function(callback) {
      emitter.on('connected', callback);
    },
 
    send: function(message) {
      rtc.send(message);
    },
 
    onMessage: function(cb) {
      emitter.on('message', cb);
    }
  };
};
