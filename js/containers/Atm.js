import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Components from '../components';
import * as atmActions from '../actions/atmActions';

@connect((state) => ({ atm: state.atm }))

/* eslint-disable react/prefer-stateless-function */
export default class Atm extends Component {
  static propTypes = {
    atm: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  getScreen() {
    const { atm: { card, isWaiting, isError }, dispatch } = this.props;
    const actions = bindActionCreators(atmActions, dispatch);

    if (isError) {
      return <Components.ErrorScreen onDismiss={actions.reset} />;
    }
    if (isWaiting) {
      return <Components.WaitingScreen />;
    }
    if (!card) {
      return <Components.WelcomeScreen onInsertCard={actions.insertCard} />;
    }
    if (card.isBlocked) {
      return (<Components.InfoScreen
        title="Card blocked"
        message="We have blocked and retained your card. It's just not your day, right?"
        onDismiss={actions.reset}
      />);
    }
    if (!card.authorised) {
      return (<Components.PinEnter
        attemptsCount={card.attemptsCount}
        maxAttempts={card.maxAttempts}
        onPinEnter={actions.checkPin}
        onCancel={actions.returnCard}
      />);
    }
    return <Components.ErrorScreen onDismiss={actions.reset} />;
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
