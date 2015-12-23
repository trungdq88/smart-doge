/**
 * Created by dinhquangtrung on 11/10/15.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import App from '../App.jsx';
import { expect } from 'chai';

describe('App', () => {
  it('Should have the bootstrap button', () => {
    const app = TestUtils.renderIntoDocument(
      <App />
    );
    const appElement = ReactDOM.findDOMNode(app);
    expect(appElement.querySelectorAll('#the-bootstrap-btn').length).to.equal(1);
  });
});
