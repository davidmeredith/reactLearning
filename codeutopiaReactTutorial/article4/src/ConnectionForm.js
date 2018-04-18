var React = require('react');
//You need this npm package to do createReactClass
var createReactClass = require('create-react-class');
 
module.exports = createReactClass({
  render: function() {
    return <div>
      {this.props.connected ? 'Connected' : 'Not connected'}
      <button onClick={this.props.onHost}>Host</button>
      <button onClick={this.props.onJoin}>Join</button>
    </div>;
  }
});
