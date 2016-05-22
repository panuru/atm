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

@connect((state) => ({ cart: state.atm.cart }))

export default class Atm extends Component {
  static propTypes = {
    cart: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  getCurrentScreen() {
    const { cart } = this.props;

    if (!cart) {
      return atmScreens.Welcome;
    } else if (!cart.authorised) {
      return atmScreens.PinEnter;
    }

    return atmScreens.Error;
  }

  render() {
    const { cart, dispatch } = this.props;
    const actions = bindActionCreators(atmActions, dispatch);

    switch (this.getCurrentScreen()) {
      case atmScreens.Welcome:
        return <Components.WelcomeScreen onInsertCart={actions.insertCart} />;
      case atmScreens.PinEnter:
        return <Components.PinEnter cart={cart} />;
      case atmScreens.Error:
      default:
        return <Components.ErrorScreen />;
    }
  }
}
