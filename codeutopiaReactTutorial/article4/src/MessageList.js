var React = require('react');
 
//You need this npm package to do createReactClass
var createReactClass = require('create-react-class');

var ChatMessage = require('./ChatMessage');
 
module.exports = createReactClass({
  render: function() {
    var messages = this.props.messages.map(function(msg) {
      return <ChatMessage message={msg} />;
    });
 
    return <div>{messages}</div>;
  }
});
