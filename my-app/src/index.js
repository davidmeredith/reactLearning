import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

/*
## React Elements
- Smallest React building block describing a UI output of one or more Elements. 
- Elements can represent individual DOM tags (eg. <div>) or user-defined 
  React Components (e.g. <Welcome/>, components can refer to other components in their output). 
- Can be defined in JSX - transpile to pure JS
- JSX can accept JS expressions in {curly}
- Wrap JSX in parenthesis to avoid automatic semi-colon insertion on new lines. 
- Uses camelCase for element attributes, e.g. 'class' becomes className, onclick  becomes onClick

## Components 
- Are conceptually like functions, they accept inputs called 'props' and return react elements. 

### Functional Components
- For 'Controlled components' with no state 

### Class Components 
- Extend React.Component for stateful components 

### Component Props
- Readonly values and functions passed from calling component 
- You should name props from the component's own point of view rather than from  the context from which
it is being called (i.e. from the parent Component). 

### Component State
- Private mutable state, fully controlled and encapsulated by the component.  

*/

function ActionLink(props) {
  function handleClick(e) {
    // can't return false to prevent default behavior
    // you need to call preventDefault explicitly 
    e.preventDefault(); 
    console.log("The link was clicked.");
  }

  // conditional rendering based on passed in prop
  if(props.isLoggedIn){
    return (
      <a href="#willprinttoconsole" onClick={handleClick}>
        Logged In user Click me (only prints to console)
      </a>
    );
  }
  return (
    <a href="#willprinttoconsole" onClick={handleClick}>
      Unknown user Click me (only prints to console)
    </a>
  );
}


class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // If no additional args are passed to handleClick, the
    // following binding is necessary to make `this` work in the callback ()
    // We don't use it here because handleClick defines additional args
    // this.handleClick = this.handleClick.bind(this);
  }

  handleClick(exampleArg) {
    console.log(exampleArg);
    // we need to use the previous state.isToggleOn to calculate the new value of isToggleOn  
    // so use the version of setState that accepts the function - it receives the 
    // previous state as the first argument, and the props at the time the update is 
    // applied as the second argument (optional):
    this.setState( (prevState, props) => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      /* Its Common to have an event handler on the class such as handleClick */ 
      /*
      If you don't like using 'bind' in the constructor to bind 'this' in handleClick, 
      OR you need to pass an argument to the event handler, you an use either a 
      Function.prototype.bind approach as implemented below, or an Arrow function approach
      (below lines are equivalent) 
        <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
        <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

      (In both cases, the e argument representing the React event will be passed as a 
        second argument after the ID. With an arrow function, we have to pass it 
        explicitly, but with bind any further arguments are automatically forwarded.)  

      React recommend bind approach or using experimental 'class fields syntax' 
      e.g. see: https://reactjs.org/docs/handling-events.html 
      */
      <button onClick={this.handleClick.bind(this, 'myArg')}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    // the only place you can assign state is in the constructor
    // in all other parts of class, call this.setState()
    this.state = {date: new Date()};
  }

  componentDidMount() {
    // timerID inherited? 
    this.timerID = setInterval( () => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    // calling setState() React knows the state has changed and calls render() again  
    // The given object is merged into the state (so you can update separate state vars 
    // separately leaving othe state vars in-tact)
    this.setState({ date: new Date() });
    // If you need to calculate the new state from props, use the 2nd form of setState() 
    // that accepts a function rather than an object - the function will receive the 
    // previous state as the first argument, and the props at the time the update is 
    // applied as the second argument:
    // 
    // Wrong:
    // this.setState({
    //   counter: this.state.counter + this.props.increment,
    // });
    //
    // Correct:
    // this.setState((prevState, props) => ({
    //  counter: prevState.counter + props.increment
    // }));
  }

  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        <ActionLink isLoggedIn={true}/>
      </div>
    );
  }
}



/* 
// Since Square is a 'Controlled Component' we can use the 
// functional component notation instead.   
class Square extends React.Component {
  // Square is an immutable 'Controlled Component' 
  // - it has no internal state of its own, only props. 
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}
*/
function Square(props) {
  // using functional component notation, we don't use 'this' (Square is not a class).
  // Also, we don't use onClick={props.onClick()} as it would be invoked immediately 
  // instead of invoking when we actually click! 
  return (
    <button className="square" onClick={props.sqOnClick}>
      {props.value}
    </button>
  );
}





class Board extends React.Component {

  renderSquare(i) {
    // wrap JSX in parenthesis.
    // Pass down values for two named props to Square; 'value' and the 'sqOnClick' callback function definition
    // both will be available in Square via its props. 
    // Note that this.props.boardOnClick(i) value was itself passed down from Game
    // - we are chaining the click from Square up to Board and up to Game.  
    // Note that this.props.boardOnClick(i) requires an int arg. 
    return (
      <Square 
        value={this.props.squares[i]} 
        sqOnClick={() => this.props.boardOnClick(i)}
      />
    );
  }

  render() {
     return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}






class Game extends React.Component {

  // When you want to aggregate data from multiple children or 
  // to have two child components communicate with each other, 
  // move the state upwards so that it lives in the parent component. 
  // The parent can then pass the state back down to the children via props, 
  // so that the child components are always in sync with each other and with the parent.

  constructor(props) {
    super(props);
    this.state = {
      // history is a 2D array of the form: 
      /*
      history = [
        {
          squares: [
            null, null, null, null, null, null, null, null, null,
          ]
        },
        {
          squares: [
            null, null, null, null, 'X', null, null, null, null,
          ]
        },
        // ...
      ]
      */
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }


  handleClick(i) {
    // call slice() to copy the squares array instead of mutating 
    // the existing squares array (i.e. replace the data with a new 
    // copy of the object that also includes desired state changes).
    // This is considered better for performance, helping with React's 
    // automatic component re-rendering. 
    // Note, by replacing rather than mutating, its also possible to 
    // maintain a 'state history' to reference older versions of the state!
    // 
    //      Another example of replace rather than mutate: 
    //        var player = {score: 1, name: 'Jeff'};
    //        var newPlayer = Object.assign({}, player, {score: 2});
    //      Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}
    //      Or, if you are using object spread syntax proposal, you can write:
    //      var newPlayer = {...player, score: 2}; 
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // return early and ignore the click if someone has won already
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "0";
    // Whenever this.setState is called, an update to the 
    // component is scheduled, causing React to merge in the 
    // passed state and update and rerender the component 
    // *along with its descendants*.
    this.setState({
      // push a new entry onto the stack by concatenating 
      // the new history entry to make a new history array.
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    // Let’s show the previous moves made in the game so far. 
    // React elements are first-class JS objects and we can store them 
    // or pass them around. To render multiple items in React, we pass 
    // an array of React elements. The most common way to build that array 
    // is to call 'map' over your array of data in order to return a new array 
    // that contains the desired result - here we are mapping over a local 
    // copy of the state.history and building a new array of React elements each 
    // with a unique key (note, 'key' is a reserved word in JSX). 
    // 
    // 'map' accepts a callback function which is called once for each element in the 
    // (history) array in order, and an optional 'thisValue' arg for binding this. 
    //   array.map(function(currentValue, index, arr), thisValue); 
    // The callback function can define up to 3 args: 
    //       currentValue -	Required. The value of the current element
    //       index	      -  Optional. The array index of the current element
    //       arr	        -  Optional. The array object the current element belongs to
    //
    // Therefore, 'step' is the currentValue (a nested array as history is a 2D array), 
    // 'move' is an int that represents the index of each element of the array.
    
    // arrow function is called on each element of the array, and returns an array 
    // that contains the result 
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
        {/* 
        We pass Board's 'boardOnClick' property as a function that requires an int 
        - here this.handleClick(i) gets called. 
        */}
          <Board
            squares={current.squares}
            boardOnClick={(i) => this.handleClick(i)}
          />

        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <br/>
        <div style={{display: "block"}}>
          <Clock />
          <Toggle />
        </div>
      </div>
    );
  }
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById("root")
);


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}