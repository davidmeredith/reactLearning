
import React from "react";

export function ActionLink(props) {
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