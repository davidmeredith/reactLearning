var React = require('react');
// load react - note that modules are 'isolated' which means 
// each/every file needs to require a module if it uses that module

//You need this npm package to do createReactClass
var createReactClass = require('create-react-class');

var MessageList = require('./MessageList');  
var MessageForm = require('./MessageForm'); 
var MessageStore = require('./MessageStore'); 

// Chat component is a 'Controller Component' that handles all state. 
// ideally, you want to keep state and changes to state in centralized 
// locations like this. Our other components are reasonably simple – they 
// mainly render something based on props. This is a concrete benefit of 
// the approach of keeping state centralized: We can keep much of our code simple.

module.exports = createReactClass({
  getInitialState: function() {
    return {
      //messages: []
      messages: MessageStore.getMessages() 
    };
  },

  componentWillMount: function() {
      // You might notice we’re using 'this' quite carelessly here – if you’ve used this, 
      // I’m sure you’ve ran into problems where it doesn’t point at what you think. 
      // React saves us from some trouble by automatically binding this into the component. 
      // Thanks to this (pun intended) we can safely pass around the this.updateMessages function.
      MessageStore.subscribe(this.updateMessages);
  },
 
  componentWillUnmount: function() {
      MessageStore.unsubscribe(this.updateMessages);
  },

  updateMessages: function() {
      this.setState({
          messages: MessageStore.getMessages()
      });
  },

  onSend: function(newMessage) {
    // Adding a new message triggers our custom event handling   
    // newMessage invokes the 'update' event on the emitter, 
    // which in turn triggers Chat's updateMessages() handler to update the state. 
    // This is a typical React flow: 
      // 1) you have a data store
      // 2) A component triggers an update in the data store (e.g. MessageStore.newMessage(newMessage)); 
      // 3) The data store emitts an event, which we subscribe to in e.g. componentWillMout
      // 4) Components which display data in the store listen to it (e.g. this.updateMessage()) and update their internal state. 
    MessageStore.newMessage(newMessage); 
  },

 
  render: function() {
    return <div>
      { /* pass the list of messages to the MessageList (available as 'this.props.messages' in MessageList */ }    
      <MessageList messages={this.state.messages} />    
      { /* pass reference to onSend() callback*/ }    
      <MessageForm onSend={this.onSend} />    
    </div>;
  }
});
