import React from 'react';
import ReactDOM from 'react-dom';
import Step0 from './Step0';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Step0 />, div);
  ReactDOM.unmountComponentAtNode(div);
});