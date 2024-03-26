import React from 'react';
import ReactDOM from 'react-dom';
import Step1 from './Step1';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Step1 />, div);
  ReactDOM.unmountComponentAtNode(div);
});