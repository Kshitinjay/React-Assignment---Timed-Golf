import React, { Component, useState } from "react";
import "../styles/App.css";
class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      time: 0,
      x: 0,
      y: 0,
      status: 0,
    };
  }

  handleIncrement = () => {
    if(this.state.x !== 250 && !this.state.y !==250){
      this.setState({
        status: 1,
      });
      this.clock = setInterval(() => {
        this.setState({
          time: this.state.time + 1,
        });
        // console.log(this.state.time);
      }, 1000);
    }
  };

  move = (evt) => {
    if (this.state.status == 1) {
      // console.log(this.state.status);
      if (evt.keyCode === 37) {
        this.setState({
          y: this.state.y - 5,
        });
      } else if (evt.keyCode === 38) {
        this.setState({
          x: this.state.x - 5,
        });
      } else if (evt.keyCode === 39) {
        this.setState({
          y: this.state.y + 5,
        });
      } else if (evt.keyCode === 40) {
        this.setState({
          x: this.state.x + 5,
        });
      }
      if (this.state.x == 250 && this.state.y == 250) {
        clearInterval(this.clock);
        document.removeEventListener("keydown", this.move);
      }
    }
  };
  componentDidMount() {
    document.addEventListener("keydown", this.move);
    return () => {
      document.removeEventListener("keydown", this.move);
    };
  }

  componentWillUnmount() {
    clearInterval(this.clock);
  }

  render() {
    return (
      <>
        <div
          style={{
            position: "absolute",
            top: this.state.x,
            left: this.state.y,
          }}
          className="ball"
        ></div>
        <button className="start ballProvider" onClick={this.handleIncrement}>
          Start
        </button>
        <div className="heading-timer">{this.state.time}</div>

        <div className="hole"></div>
      </>
    );
  }
}

export default Timer;
