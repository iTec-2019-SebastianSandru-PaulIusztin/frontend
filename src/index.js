import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { store, persistor } from './redux/store';
import * as serviceWorker from './serviceWorker';
import './assets/vendor/nucleo/css/nucleo.css';
import './assets/vendor/@fortawesome/fontawesome-free/css/all.min.css';
import './assets/scss/argon-dashboard-react.scss';
import App from './containers/App';

import './index.css';

ReactDOM.render(
  <PersistGate persistor={ persistor } loading={ <div /> }>
    <Provider store={ store }>
      <App />
    </Provider>
  </PersistGate>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
