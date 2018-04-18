var React = require('react');
// Instead of using a global, use require to load react

//You need this npm package to do createReactClass
var createReactClass = require('create-react-class');

// assign ChatMessage component (name of file) into module.exports. 
// Anything assigned into module.exports is available to other modules
// that require the ChatMessage.js file
module.exports = createReactClass({
  render: function() {
    return <p>{this.props.message}</p>;
  }
});
