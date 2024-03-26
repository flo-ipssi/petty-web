import React from 'react';
import ReactDOM from 'react-dom';
import Step4 from './Step4';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Step4 />, div);
  ReactDOM.unmountComponentAtNode(div);
});