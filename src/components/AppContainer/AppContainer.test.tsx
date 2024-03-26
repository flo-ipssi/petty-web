import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './AppContainer';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});