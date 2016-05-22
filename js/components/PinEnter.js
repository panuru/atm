import React, { Component, PropTypes } from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class PinEnter extends Component {
  static propTypes = {
    onPinEnter: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  render() {
    const { onCancel, onPinEnter } = this.props;
    return (
      <form>
        <FormGroup>
          <ControlLabel>Please enter PIN</ControlLabel>
          <FormControl ref="pin" type="text" placeholder="- - - -" />
        </FormGroup>
        <Button onclick={onCancel}>Cancel</Button>
        <Button className="pull-right" onclick={() => onPinEnter(this.refs.pin.text())}>OK</Button>
      </form>
    );
  }
}

export default PinEnter;
