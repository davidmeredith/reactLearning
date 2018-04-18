import React from "react";
import { ActionLink } from "./ActionLink"; 


export class Clock extends React.Component {
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

// can't get CommonJS export to work 
//module.exports = Clock;   
  
  
  