// Need to load react-dom to render the component into the DOM/HTML.
var ReactDOM = require('react-dom');
var React = require('react');
 
var Chat = require('./Chat');

// As a side note: The module.exports and require() style modules 
// are known as CommonJS modules. Node.js, Browserify and Webpack 
// all make use of this style. This is not to be confused with a 
// different module style, RequireJS, which is not recommended to be used.

ReactDOM.render(
  <Chat />,
  document.getElementById('app')
);
