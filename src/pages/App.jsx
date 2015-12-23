import React from 'react';
import gauss from '../third-party/gauss.js';
import calc from './calc.js';

export default class App extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      numbers: '',
    };
  }

  onNumberChange(e) {
    this.setState({
      numbers: e.target.value,
    });
  }

  find() {
    console.log(calc(this.state.numbers.split(' ').map(n => +n), gauss));
  }

  render() {
    return (
      <div>
        <p>
          <input
            type="text"
            className="form-control"
            value={this.state.number}
            onChange={this.onNumberChange.bind(this)}
          />
        </p>
        <button
          className="btn btn-primary"
          onClick={this.find.bind(this)}
        >
          Find next number
        </button>
      </div>
    );
  }
}
