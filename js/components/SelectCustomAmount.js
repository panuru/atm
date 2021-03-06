import React, { Component, PropTypes } from 'react';
import PubSub from 'pubsub-js';
import { Button, FormControl, FormGroup } from 'react-bootstrap';

export default class SelectAmount extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  componentDidMount() {
    this.__pubSubToken = PubSub.subscribe('KEYBOARD', (msg, data) => this.onKeyUp(data));
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.__pubSubToken);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSelect(parseInt(this.state.value, 10));
  }

  onKeyUp(e) {
    // TODO extract input component
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

    let digit;
    if (e.which >= 48 && e.which <= 57) { // Keyboard number 0-9
      digit = String.fromCharCode(e.which);
    } else if (/\d/.test(e.key)) { // Virtual keyboard digit
      digit = e.key;
    }
    if (digit) {
      this.setState({
        value: value + digit,
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <FormGroup>
          <FormControl
            ref="amount"
            type="text"
            autoFocus
            placeholder="0"
            value={this.state.value}
            onKeyUp={this.onKeyUp}
          />
        </FormGroup>

        <Button onClick={this.props.onCancel}>Cancel</Button>
        <Button
          bsStyle="primary"
          className="pull-right"
          type="submit"
          disabled={this.state.value === ''}
        >
          OK
        </Button>
      </form>

    );
  }
}
