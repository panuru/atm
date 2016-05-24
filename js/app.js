import 'bootstrap/dist/css/bootstrap.css';
import '../css/app.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import Atm from './containers/Atm';
import * as reducers from './reducers';

/** This is the entry point for the application.
  * Create a Redux store, pass it to provider,
  * render the aplication into root container.
  */

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(
    thunkMiddleware
  )
);

ReactDOM.render(
  (
    <div className="container app-main">
      <Provider store={store}>
        <Atm />
      </Provider>
    </div>
  ), document.getElementById('root')
);
