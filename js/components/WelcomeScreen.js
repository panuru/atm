import React, { PropTypes } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';

const WelcomeScreen = ({ onInsertCard }) =>
  (
    <Jumbotron>
      <h1>Welcome to <nobr>The Bank Of Doom</nobr> ATM!</h1>
      <p>Please insert your card.</p>
      <form onSubmit={(e) => { e.preventDefault(); onInsertCard(); } }>
        <Button bsStyle="primary" bsSize="large" autoFocus type="submit">Yeah, here it is!</Button>
      </form>
    </Jumbotron>
  );

WelcomeScreen.propTypes = {
  onInsertCard: PropTypes.func.isRequired
};

export default WelcomeScreen;
