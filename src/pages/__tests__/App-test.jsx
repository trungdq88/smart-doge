import { expect } from 'chai';
import gauss from '../../third-party/gauss.js';
import gauss_2 from '../../third-party/gauss_2.js';
import calc from '../calc.js';

describe('App', () => {
  it('gauss_2 should return fraction numbers', () => {
      const result = calc([1.5, 2, 3, 4, 5], gauss_2);
      expect(result.result.valueOf()).to.equal(6.5);
      expect(result.result.n).to.equal(13);
      expect(result.result.d).to.equal(2);
      expect(result.result.s).to.equal(1);
      expect(result.params[0].n).to.equal(1);
      expect(result.params[0].d).to.equal(48);
  });

  it('gauss_2 should works', () => {
    const ran = () => Math.round(Math.random() * 1000);
    const inputs = [
      [1, 2, 3, 4, 5],
      [2, 2, 2, 2, 2],
      [1, 3, 5, 7],
    ];
    const randomArray = [];
    for (let i = 0; i < Math.round(Math.random() * 10); i++) {
      randomArray.push(ran());
    }
    inputs.push(randomArray);

    for (let i = 0; i < inputs.length; i++) {
      const result1 = calc(inputs[i], gauss).result.valueOf();
      const result2 = calc(inputs[i], gauss_2).result.valueOf();
      expect(result1).to.equal(result2);
    }
  });
});
