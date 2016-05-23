import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Components from '../components';
import * as actionCreators from '../actions/index';

@connect((state) => ({ atm: state.atm, card: state.card }))

/* eslint-disable react/prefer-stateless-function */
export default class Atm extends Component {
  static propTypes = {
    atm: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    const { dispatch } = props;
    this.actions = Object.keys(actionCreators).reduce((memo, key) => (
      {
        ...memo, [key]: bindActionCreators(actionCreators[key], dispatch)
      }), {});
  }

  getScreen() {
    const { card, atm: { isWaiting, isError } } = this.props;
    const actions = this.actions;

    if (isError) {
      return <Components.ErrorScreen onDismiss={actions.atm.reset} />;
    }
    if (isWaiting) {
      return <Components.WaitingScreen />;
    }
    if (!card.isInserted) {
      return <Components.WelcomeScreen onInsertCard={actions.card.insertCard} />;
    }
    if (card.isBlocked) {
      return (<Components.InfoScreen
        title="Card blocked"
        message="We have blocked and retained your card. It's just not your day, right?"
        onDismiss={actions.atm.reset}
      />);
    }
    if (!card.isAuthorised) {
      return (<Components.PinEnter
        attemptsCount={card.attemptsCount}
        maxAttempts={card.maxAttempts}
        onPinEnter={actions.card.checkPin}
        onCancel={actions.card.returnCard}
      />);
    }
    return <Components.ErrorScreen onDismiss={actions.atm.reset} />;
  }

  render() {
    return (
      <div>
        <div className="atm-screen">
          {this.getScreen()}
        </div>
        <Components.NumberKeyboard />
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
