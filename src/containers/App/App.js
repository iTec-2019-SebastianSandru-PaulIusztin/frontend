import React from 'react';
import { connect } from 'react-redux';

import logo from './logo.svg';
import './App.css';

import { auth } from '../../redux';

function App({ dispatch }) {
  // TODO: TEST CODE: DELETE ME
  dispatch(auth.logout());
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.js</code>
          {' '}
and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default connect()(App);
