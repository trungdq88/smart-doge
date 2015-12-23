import React from 'react';
import gauss from '../third-party/gauss.js';

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
    const numbers = this.state.numbers.split(' ').map(n => +n);
    const matrix = [];
    for (let i = 0; i < numbers.length; i++) {
      const row = [];
      for (let j = 0; j < numbers.length; j++) {
        row.push(Math.pow(i + 1, numbers.length - j - 1));
      }
      row.push(numbers[i]);
      matrix.push(row);
    }

    const params = gauss(matrix);
    let result = 0;
    const nextIndex = numbers.length + 1;
    for (let i = 0; i < numbers.length; i++) {
      result += params[i] * Math.pow(nextIndex, numbers.length - i - 1);
    }
    console.log(params);
    console.log(result);
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
