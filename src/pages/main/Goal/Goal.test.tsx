import React from 'react';
import ReactDOM from 'react-dom';
import Goal from './Goal';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Goal />, div);
  ReactDOM.unmountComponentAtNode(div);
});