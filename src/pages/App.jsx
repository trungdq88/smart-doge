import React from 'react';
import gauss_2 from '../third-party/gauss_2.js';
import '../wow-crop.jpg';
import '../style/main.less';
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
      answer: '',
      func: '',
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
    const result = calc(this.state.numbers.trim().split(' ').map(n => +n), gauss_2);
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
          <div>
            <h4>Let <b>{this.state.func}, then:</b></h4>
            <div>
              {this.state.numbers.trim().split(' ').map((number, i) => {
                return <h4 key={i}>f({i + 1}) = {number}</h4>;
              })}
              <h3>f({this.state.numbers.trim().split(' ').length + 1}) = {this.state.answer}</h3>
            </div>
          </div>
          <img width="300" src="assets/wow-crop.jpg"/>
        </div>
      );
    } else {
      return '';
    }
  }
  render() {
    return (
      <div>
        <div id="source">
          <a href="https://github.com/trungdq88/smart-doge">
            https://github.com/trungdq88/smart-doge
          </a>
        </div>
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
