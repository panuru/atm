import 'bootstrap/dist/css/bootstrap.css';
import '../css/app.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import Atm from './containers/Atm';
import * as reducers from './reducers';

const store = createStore(combineReducers(reducers));

ReactDOM.render(
  (
    <div className="container app-main">
      <Provider store={store}>
        <Atm />
      </Provider>
    </div>
  ), document.getElementById('root')
);
