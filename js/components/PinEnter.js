import React, { Component, PropTypes } from 'react';
import { Alert, Button, FormGroup, FormControl, Panel } from 'react-bootstrap';

class PinEnter extends Component {
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

  onKeyUp(e) {
    const value = this.state.value;
    if (e.which === 8) { // Backspace
      this.setState({ value: value.substr(0, value.length - 1) });
      return;
    }
    if (e.which >= 48 && e.which <= 57) { // Number 0-9
      this.setState({
        value: value + String.fromCharCode(e.which),
        isShowingLastDigit: true
      });

      setTimeout(() => this.setState({ isShowingLastDigit: false }), 400);
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const pin = parseInt(this.state.value, 10);
    if (isNaN(pin)) { return; }

    this.setState({ value: '' });

    this.props.onPinEnter(pin);
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

export default PinEnter;
