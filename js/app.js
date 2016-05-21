import 'bootstrap/dist/css/bootstrap.css';
import '../css/app.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Jumbotron } from 'react-bootstrap';

ReactDOM.render(
  <div className="container atm-main">
    <Jumbotron>
      <h1>Hello World!</h1>
      <p>Nothing to see here, move along.</p>
    </Jumbotron>
  </div>,
  document.getElementById('root')
);
