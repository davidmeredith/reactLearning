import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
This is the simple version of the tic tac toe game without
storing the game history. 
See: https://reactjs.org/tutorial/tutorial.html 
*/

/* 
//Since Square is a 'Controlled Component' we can use the 
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
  // Also, we don't use onClick={props.onClick()} as it would be invoked immediatley 
  // instead of invoking when we actually click! 
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  // When you want to aggregate data from multiple children or 
  // to have two child components communicate with each other, 
  // move the state upwards so that it lives in the parent component. 
  // The parent can then pass the state back down to the children via props, 
  // so that the child components are always in sync with each other and with the parent.

  constructor(props) {
    super(props); // in ES6, need to explicitly call super
    this.state = {
      squares: Array(9).fill(null),
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
    const squares = this.state.squares.slice();

    // return early and ignore the click if someone has won already
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : '0';
    // Whenever this.setState is called, an update to the 
    // component is scheduled, causing React to merge in the 
    // passed state and update and rerender the component 
    // *along with its descendants*.
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  /**
   * Internal private method.
   * @param {number} i 
   */
  renderSquare(i) {
    // wrap JSX in parenthesis.
    // Pass down two named props to Square; 'value' and the 'onClick' callback function  
    // both will be available in Square via its props 
    return (
      <Square 
        value={this.state.squares[i]} 
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status; // let in ES6 
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
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