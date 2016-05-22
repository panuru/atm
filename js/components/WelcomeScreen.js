import React, { PropTypes } from 'react';
import { Jumbotron } from 'react-bootstrap';

const WelcomeScreen = ({ onInsertCard }) =>
  (
    <Jumbotron onClick={onInsertCard}>
      <h1>Welcome to <nobr>Banky Bank</nobr> ATM!</h1>
      <p>Please insert your card.</p>
    </Jumbotron>
  );

WelcomeScreen.propTypes = {
  onInsertCard: PropTypes.func.isRequired
};

export default WelcomeScreen;
