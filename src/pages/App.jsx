import React from 'react';
import gauss_2 from '../third-party/gauss_2.js';
import calc from './calc.js';

export default class App extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      numbers: '',
      answer: '',
      func: '',
    };
  }

  onNumberChange(e) {
    this.setState({
      numbers: e.target.value,
    });
  }

  getValue(fraction) {
    const sign = fraction.s === 1 ? '' : '-';
    return fraction.d === 1 ? fraction.valueOf() : `${sign}${fraction.n}/${fraction.d}`;
  }

  buildFuncString(params) {
    let func = 'f(x) = ';

    for (var i = 0; i < params.length; i++) {
      let positive = params[i].s === 1;
      let val = this.getValue(params[i]);
      let pow = params.length - 1 -i;
      const operator = positive ? '+' : '';


      if (val === 0) continue;
      if (val === 1 && pow !== 0) val = '';
      if (pow === 0) {
        func += `${operator} ${val} `;
      } else if (pow === 1) {
        func += `${operator} ${val}x `;
      } else {
        func += `${operator} ${val}x^${pow} `;
      }
    }

    func = func.replace(/ = \+/, ' =');

    return func;
  }
  find() {
    const result = calc(this.state.numbers.split(' ').map(n => +n), gauss_2);
    const number = this.getValue(result.result);

    this.setState({
      answer: number,
      func: this.buildFuncString(result.params),
    });
  }

  renderDescription() {
    if (this.state.answer) {
      return (
        <div>
          <h1>
            The next number is {this.state.answer}
          </h1>
          <h3>Why?</h3>
          <p>
            Let <b>{this.state.func}</b>
            <br/>
            Then:
            <br/>
            <div>
              {this.state.numbers.split(' ').map((number, i) => {
                return <p key={i}>f({i + 1}) = {number}</p>;
              })}
              <b>f({this.state.numbers.split(' ').length + 1}) = {this.state.answer}</b>
            </div>
          </p>
        </div>
      );
    } else {
      return '';
    }
  }
  render() {
    return (
      <div>
        <p>Enter your number sequence (Example: "1 2 3 4")</p>
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
        {this.renderDescription()}
      </div>
    );
  }
}
