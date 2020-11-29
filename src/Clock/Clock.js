import React from 'react';
import './Clock.css';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
    };
  }

  getTimeString(input) {
    const time = input.toLocaleTimeString();
    let [body, suffix] = time.split(' ');
    body = body.substring(0, body.lastIndexOf(':'));
    return { body, suffix };
  }

  // Get quote when component mounts
  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.setState({ time: new Date() });
    }, 15000);
  }

  componentWillUnmount() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
    }
  }

  render() {
    return (
      <div className="clock-container">
        <h1>{this.getTimeString(this.state.time).body}</h1>
        <p>{this.getTimeString(this.state.time).suffix}</p>
      </div>
    );
  }
}

export default Clock;
