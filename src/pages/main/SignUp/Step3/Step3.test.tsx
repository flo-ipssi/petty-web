import React from 'react';
import ReactDOM from 'react-dom';
import Step3 from './Step3';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Step3 />, div);
  ReactDOM.unmountComponentAtNode(div);
});