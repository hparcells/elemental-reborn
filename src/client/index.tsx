import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import App from './components/App';

import './index.scss';

ReactDOM.render(<App />, document.getElementById('root'));

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-134185568-10');
  ReactGA.pageview('/');
}
