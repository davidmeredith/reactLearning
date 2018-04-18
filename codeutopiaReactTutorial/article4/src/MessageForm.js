var React = require('react');
//You need this npm package to do createReactClass
var createReactClass = require('create-react-class');
 
module.exports = createReactClass({
  getInitialState: function() {
    return {
      input: ''
    };
  },
 
  submit: function(ev) {
    ev.preventDefault();
  
    // Invoke parent onSend() callback.  
    // (onSend() passed from parent as a callback using: <MessageForm onSend={this.onSend} />      
    // We can pass any JS value as a prop, including functions.
    // This means we can easily do custom “events” like onSend  
    this.props.onSend(this.state.input);
 
    this.setState({
      input: ''
    });
  },
 
  updateInput: function(ev) {
    this.setState({ input: ev.target.value });
  },
 
  render: function() {
    return <form onSubmit={this.submit}>
      <input value={this.state.input} onChange={this.updateInput} type="text" />
      <input type="submit" value="Send" />
    </form>;
  }
});
