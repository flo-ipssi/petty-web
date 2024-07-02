import React from 'react';
import ReactDOM from 'react-dom';
import ImageCropper from './ImageCropper';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ImageCropper />, div);
  ReactDOM.unmountComponentAtNode(div);
});