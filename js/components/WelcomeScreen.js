import React, { PropTypes } from 'react';
import { Jumbotron } from 'react-bootstrap';

const WelcomeScreen = ({ onInsertCart }) =>
  (
    <Jumbotron onClick={onInsertCart}>
      <h1>Welcome to <nobr>Banky Bank</nobr> ATM!</h1>
      <p>Please insert your cart.</p>
    </Jumbotron>
  );

WelcomeScreen.propTypes = {
  onInsertCart: PropTypes.func.isRequired
};

export default WelcomeScreen;
