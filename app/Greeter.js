//Greeter,js
import React, {Component} from 'react'
import config from './config.json';
// import  './Greeter.css'
class Greeter extends Component{

  render() {
    return (
      <div className="greet">
        {config.greetText}
      </div>

    );
  }
}

export default Greeter

