import React from 'react';
import ReactDOM from 'react-dom';
import UploadResidence from './UploadResidence';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UploadResidence />, div);
  ReactDOM.unmountComponentAtNode(div);
});