import React from 'react';
import ReactDOM from 'react-dom';
import Step2 from './Step2';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Step2 />, div);
  ReactDOM.unmountComponentAtNode(div);
});