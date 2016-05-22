import React, { PropTypes } from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const PinEnter = ({ onPinEnter, onCancel }) =>
  (
    <form>
      <FormGroup>
        <ControlLabel>Please enter PIN</ControlLabel>
        <FormControl type="text" placeholder="- - - -" />
      </FormGroup>
      <Button onclick={onCancel}>Cancel</Button>
      <Button className="pull-right" onclick={onPinEnter}>OK</Button>
    </form>
  );

PinEnter.propTypes = {
  onPinEnter: PropTypes.func,
  onCancel: PropTypes.func
};

export default PinEnter;
