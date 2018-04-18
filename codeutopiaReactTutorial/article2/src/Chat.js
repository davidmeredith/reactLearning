var React = require('react');
// load react - note that modules are 'isolated' which means 
// each/every file needs to require a module if it uses that module

// Because ChatMessage is not installed as an npm module, we 
// need to define a path to the module file. 
// ChatMessage was also put into module.exports so we can 
// require it here. 
var ChatMessage = require('./ChatMessage');

class Chat extends React.Component{

  constructor(props){
    super(props);
    this.state = { text: '', messages: []};
    // This binding is necessary to make `this` work in the callback
    // or, if additional args need to be passed to updateInput, 
    // then either 'bind' to updateInput when invoked or use an arrow
    // function, see render method below. 
    //this.updateInput = this.updateInput.bind(this);
  }

  submit(arg, ev){
    ev.preventDefault();
    console.log(arg); 
    var newMessage = <ChatMessage message={this.state.text} />;
 
    this.setState({
      messages: this.state.messages.concat([newMessage]),
      text: ''
    });
  }

  updateInput(ev){
    this.setState({
      text: ev.target.value
    });
  }

  render(){
    /* Its Common to have an event handler on the class such as handleClick */ 
      /*
      If you don't like using 'bind' in the constructor to bind 'this' in handleClick, 
      OR you need to pass an argument to the event handler, you an use either a 
      Function.prototype.bind approach as implemented below, or an Arrow function approach
      (below lines are equivalent) 
        <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
        <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

      (In both cases, the e argument representing the React event will be passed as a 
        second argument after the custom id arg. With an arrow function, we have to pass it 
        explicitly, but with bind any further arguments are automatically forwarded.)  

      React recommend bind approach or using experimental 'class fields syntax' 
      e.g. see: https://reactjs.org/docs/handling-events.html 
      */
    return (
     <div>
      <div>{this.state.messages}</div>
      {/* 'bind' to the submit function and pass: 'this' (to bind this correctly in the function), 
       a customArg, and the event which is automatically passed and does not need to be 
       explicitly passed */}
      <form onSubmit={this.submit.bind(this, "myCustomArg")}>
         {/* use arrow function example, the event has to be explicitly passed */}
        <input onChange={(e) => this.updateInput(e)} value={this.state.text} type="text" placeholder="Your message" />
        <input type="submit" value="Send" />
      </form>
    </div>
    );
  }

}

module.exports = Chat; 

/*
// older createClass approach: 

var React = require('react');
// load react - note that modules are 'isolated' which means 
// each/every file needs to require a module if it uses that module

//You need this npm package to do createReactClass
var createReactClass = require('create-react-class');

// Because ChatMessage is not installed as an npm module, we 
// need to define a path to the module file. 
// ChatMessage was also put into module.exports so we can 
// require it here. 
var ChatMessage = require('./ChatMessage');
 
module.exports = createReactClass({
  getInitialState: function() {
    return {
      text: '',
      messages: []
    };
  },
 
  submit: function(ev) {
    ev.preventDefault();
 
    var newMessage = <ChatMessage message={this.state.text} />;
 
    this.setState({
      messages: this.state.messages.concat([newMessage]),
      text: ''
    });
  },
 
  updateInput: function(ev) {
    this.setState({
      text: ev.target.value
    });
  },
 
  render: function() {
    return <div>
      <div>{this.state.messages}</div>
      <form onSubmit={this.submit}>
        <input onChange={this.updateInput} value={this.state.text} type="text" placeholder="Your message" />
        <input type="submit" value="Send" />
      </form>
    </div>;
  }
});
*/
