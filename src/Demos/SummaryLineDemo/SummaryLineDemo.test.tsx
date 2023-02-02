import React from 'react';
import ReactDOM from 'react-dom';

import SummaryLineDemo from './SummaryLineDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SummaryLineDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
