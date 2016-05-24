import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Components from '../components';
import * as actionCreators from '../actions/index';

/**
 * This the only 'container' component that is aware of state and actions.
 * It gets the state in props from redux connector;
 * Based on state, it figures out which screen to render, and attaches action callbacks to it.
 *
 * TODO: with more logic, there will be a need to split this into more components.
 */

@connect((state) => ({ atm: state.atm, card: state.card, account: state.account }))

/* eslint-disable react/prefer-stateless-function */
export default class Atm extends Component {
  static propTypes = {
    atm: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    // Initialize actions once, as they are not going to change with the state.
    const { dispatch } = props;
    this.actions = Object.keys(actionCreators).reduce((memo, key) => (
      {
        ...memo, [key]: bindActionCreators(actionCreators[key], dispatch)
      }), {});
  }

  getScreen() {
    const { card, account, atm: { isWaiting, isError } } = this.props;
    const actions = this.actions;

    if (isError) {
      return <Components.ErrorScreen onDismiss={actions.atm.reset} />;
    }
    if (isWaiting) {
      return <Components.WaitingScreen />;
    }
    if (card.hasReturnedCard) {
      return (<Components.InfoScreen
        title="See you!"
        message="Please take back your card"
        onDismiss={actions.atm.reset}
      />);
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
        onPinEnter={(pin) => actions.card.checkPin(card, pin)}
        onCancel={actions.card.returnCard}
      />);
    }
    if (!account.isLoaded) {
      // If card is authorised, load account immediately.
      setTimeout(() => (actions.account.load(card)), 0);
      return <Components.WaitingScreen />;
    }
    if (account.hasWithdrawn) {
      return (
        <Components.InfoScreen
          title="Thank you!"
          message={`Please take your imaginary ${account.hasWithdrawn}\$ and card.`}
          onDismiss={actions.atm.reset}
        />
      );
    }
    return (
      <Components.SelectAmount
        onSelect={(amount) => actions.account.withdraw(account, amount)}
        onCancel={actions.card.returnCard}
      />
    );
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
