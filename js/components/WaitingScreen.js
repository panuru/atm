import React from 'react';
import { Jumbotron, ProgressBar } from 'react-bootstrap';

export default () => (
  <Jumbotron>
    <h1>Please wait...</h1>
    <ProgressBar active now="100" />
  </Jumbotron>);
