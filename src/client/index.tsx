import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import App from './components/App';

import './index.scss';

import packageJson from '../../package.json';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://c3b578c35b2d44859f778a5435ff97c9@o187283.ingest.sentry.io/5468460',
    integrations: [new Integrations.BrowserTracing()],
    release: `elemental-reborn@${packageJson.version}`,
    tracesSampleRate: 1.0,
    beforeSend(event) {
      if (event.exception) {
        Sentry.showReportDialog({ eventId: event.event_id });
      }
      return event;
    }
  });
}

ReactDOM.render(<App />, document.getElementById('root'));

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-134185568-10');
  ReactGA.pageview('/');
}
