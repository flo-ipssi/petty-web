import React from 'react';
import ReactDOM from 'react-dom';
import Infos from './Infos';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Infos />, div);
  ReactDOM.unmountComponentAtNode(div);
});