import React, { Component, PropTypes } from 'react';
import PubSub from 'pubsub-js';
import { Alert, Button, FormGroup, FormControl, Panel } from 'react-bootstrap';

export default class PinEnter extends Component {
  static propTypes = {
    onPinEnter: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    attemptsCount: PropTypes.number.isRequired,
    maxAttempts: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = { value: '', isShowingLastDigit: false };
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.__pubSubToken = PubSub.subscribe('KEYBOARD', (msg, data) => this.onKeyUp(data));
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.__pubSubToken);
    clearTimeout(this.__timeout);
  }

  onKeyUp(e) {
    if (e.key === 'ENTER') {
      this.onSubmit();
      return;
    }
    if (e.key === 'CANCEL') {
      this.props.onCancel();
      return;
    }

    const value = this.state.value;

    if (e.which === 8 || e.key === 'BACKSPACE') {
      this.setState({ value: value.substr(0, value.length - 1) });
      return;
    }
    if (e.which >= 48 && e.which <= 57) { // Number 0-9
      this.setState({
        value: value + String.fromCharCode(e.which),
        isShowingLastDigit: true
      });
    } else {
      this.setState({
        value: value + e.key,
        isShowingLastDigit: true
      });
    }

    clearTimeout(this.__timeout);
    this.__timeout = setTimeout(() => this.setState({ isShowingLastDigit: false }), 400);
  }

  onSubmit(e) {
    if (e) { e.preventDefault(); }

    if (!this.state.value) { return; }

    this.props.onPinEnter(this.state.value);
    this.setState({ value: '' });
  }

  getFormattedPin() {
    let formattedPin = this.state.value.replace(/(.)(?!$)/g, '* ');

    if (!this.state.isShowingLastDigit) {
      formattedPin = formattedPin.replace(/.$/, '*');
    }
    return formattedPin;
  }

  getAttemptsAlert() {
    const { attemptsCount, maxAttempts } = this.props;

    if (attemptsCount > 0) {
      const attemptsLeft = maxAttempts - attemptsCount;
      const attemptsLeftText = `${attemptsLeft} attempt${attemptsLeft > 1 ? 's' : ''}`;

      return (
        <Alert bsStyle="warning">
          Please try again, {attemptsLeftText} left.
          After that, your card will be retained.
        </Alert>
      );
    }
    return '';
  }

  render() {
    return (
      <Panel header="Please enter PIN">
        <form onSubmit={this.onSubmit}>
          {this.getAttemptsAlert()}
          <FormGroup>
            <FormControl
              ref="pin"
              type="text"
              autoFocus
              placeholder="- - - -"
              value={this.getFormattedPin()}
              onKeyUp={this.onKeyUp}
            />
          </FormGroup>

          <Button onclick={this.props.onCancel}>Cancel</Button>
          <Button
            bsStyle="primary"
            className="pull-right"
            type="submit"
            disabled={this.state.value === ''}
          >
            OK
          </Button>
        </form>
      </Panel>
    );
  }
}
