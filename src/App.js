import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Steppers from "./components/Steppers";
import CopyrightIcon from '@material-ui/icons/Copyright';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="text-center ">
          <div>
            <h1 className="text-header header">
              Restaurants Management Software
            </h1>
          </div>
          <Steppers />
        </div>
        <div>
          <h1 className="text-header footer">
            <div className= "footer_icon">
            <CopyrightIcon />
            </div>
            Coppyright By Hoangtph 
          </h1>
        </div>
      </div>
    );
  }
}

export default App;
