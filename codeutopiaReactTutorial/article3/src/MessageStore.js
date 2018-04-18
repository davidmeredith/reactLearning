// We create a new EventEmitter and save it into a variable. 
// Remember, when using Node-style modules, all variables we create 
// are local to the module and are not globals. 
// This means we can safely store module-private things, such as the event 
// emitter and the list of messages, simply with variables.
var EventEmitter = require('events').EventEmitter;
// private emitter
var emitter = new EventEmitter();
// private messages 
var messages = [];

// We assign an object (def name after the file) with four functions into module.exports. 
// This will be the MessageStore object we’ll use from other parts of our code.
module.exports = {
  getMessages: function() {
    // return a copy of the array (via concat()). 
    // messages is not shared mutable state. 
    // IF we returned messages, other modules could 
    // directly change messages - see ImmutableJS. 
    return messages.concat();
  },
 
  // regsiter the callback event listener function 
    // to listen to the 'update' event  
    // e.g. in parent: MessageStore.subscribe(this.updateMessages);
  subscribe: function(callback) {
    emitter.addListener('update', callback);
  },

  // unregister   
  unsubscribe: function(callback) {
    emitter.removeListener('update', callback);
  },
 
  // add new messages to the store and trigger 'update' event.   
  newMessage: function(message) {
    messages.push(message);
    emitter.emit('update');
  }
};
