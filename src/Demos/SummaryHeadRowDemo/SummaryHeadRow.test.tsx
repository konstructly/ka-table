import React from 'react';
import ReactDOM from 'react-dom';

import SummaryHeadRowDemo from './SummaryHeadRow';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SummaryHeadRowDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
