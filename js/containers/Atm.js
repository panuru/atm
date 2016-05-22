import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Components from '../components';
import atmActions from '../actions/atmActions';

const atmScreens = {
  Welcome: 'Welcome',
  PinEnter: 'PinEnter',
  Error: 'Error'
};

@connect((state) => ({ card: state.atm.card }))

export default class Atm extends Component {
  static propTypes = {
    card: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  getCurrentScreen() {
    const { card } = this.props;

    if (!card) {
      return atmScreens.Welcome;
    } else if (!card.authorised) {
      return atmScreens.PinEnter;
    }

    return atmScreens.Error;
  }

  render() {
    const { dispatch } = this.props;
    const actions = bindActionCreators(atmActions, dispatch);

    switch (this.getCurrentScreen()) {
      case atmScreens.Welcome:
        return <Components.WelcomeScreen onInsertCard={actions.insertCard} />;
      case atmScreens.PinEnter:
        return <Components.PinEnter onPinEnter={actions.checkPin} onCancel={actions.returnCard} />;
      case atmScreens.Error:
      default:
        return <Components.ErrorScreen />;
    }
  }
}
