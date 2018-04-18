var SimplePeer = require('simple-peer');
var SimpleWebsocket = require('simple-websocket');
var EventEmitter = require('events').EventEmitter;

// HostConnection 
// The basic flow for this host is: 
// - We establish a WebSocket connection with the signal server
// - If we receive data from the socket, it’s a signal for a new WebRTC connection
// - We open a WebRTC connection using the signal we received, grabbing our own signal data and sending it back over the socket
// - At this point, we just wait for the connect event. When it fires, the WebRTC connection is ready and we add it into our peer list
// - We could now close the socket if we wanted – we have a working peer to peer WebRTC connection. However, we’re going to keep it open. If we closed it, we could only support 1-to-1 chats



// peers will hold all connected clients
var peers = [];
var emitter = new EventEmitter();

// export a function instead of an object (a 'constructor function')
// - this means we can require it and directly call it. 
// The object the function returns represents the host connection - we 
// could have multiple connections if we want. 
// This is also why we're directly exporting the function rather than an 
// object; exporting an object is good for things we'll always have only 
// one of, like the MessageStore.
module.exports = function() {

  // set up a socket and add some listeners
  var socket = new SimpleWebsocket('ws://localhost:3210');
  socket.on('close', function() { console.log('Socket closed'); });
  socket.on('error', function(err) { console.log('Socket error'); console.log(err); });
  socket.on('connect', function() { console.log('Connected'); });

  // When the socket receives data  
  socket.on('data', function(data) {

    // create a new SimplePeer (this object handles the WebRTC connection for us). 
    // Set initiator to false - we're not initiating the connection, instead we 
    // respond to a new connection (the client initiates the connection). 
    var rtc = new SimplePeer({ initiator: false, trickle: false });
 
    // The data coming over the socket is WebRTC signaling data, which we 
    // need to establish a connection. We pass this data to our RTC object
    // using rtc.signal(data); which triggers the generation of our own 
    // signal data. 
    rtc.signal(data);
    // Set a signal event listener on the connection to capture our own 
    // signal data, and send it back over the socket for the client. 
    rtc.on('signal', function(data) {
      socket.send(data);
    });
 
    rtc.on('connect', function() {
      peers.push(rtc);
    });

    // Fired whenever data is received from WebRTC peer. For this, we emit
    // an event, which we'll use to setup callbacks. 
    rtc.on('data', function(msg) {
      emitter.emit('message', msg);
 
      //as host, we need to broadcast the data to the other peers
      peers.forEach(function(p) {
        if(p === rtc) {
          return;
        }
 
        p.send(msg);
      });
    });
  });


  return {
     // We share/return this obj with the client that uses the following functions: 

     // onReady is used by the client to register that it is ready  
     // (by adding the function into the host, we avoid having to 
     // check which kind of connection we're dealing with)
     onReady: function(callback) {
      //the host is always "ready" although it may
      //not have any clients
      callback();
    },

    // client sends data to all connected peers  
    send: function(message) {
      peers.forEach(function(p) { p.send(message); });
    },

    // client registers a callback to handle messages 
    onMessage: function(callback) {
      emitter.on('message', callback);
    } 
  };
};
