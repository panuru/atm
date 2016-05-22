import '../../css/components/NumberKeyboard.scss';

import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { Button, Grid, Row, Col } from 'react-bootstrap';

export default class NumberKeyboard extends Component {
  onClick(e) {
    const key = e.target.getAttribute('data-key');
    PubSub.publish('KEYBOARD', { type: 'keypress', key });
  }

  render() {
    return (
      <Grid className="number-keyboard">
        <Row>
          <Col xs={3}>
            <Button onClick={this.onClick} data-key="1" block>1</Button>
          </Col>
          <Col xs={3}>
            <Button onClick={this.onClick} data-key="2" block>2</Button>
          </Col>
          <Col xs={3}>
            <Button onClick={this.onClick} data-key="3" block>3</Button>
          </Col>
          <Col xs={3}>
            <Button onClick={this.onClick} data-key="CANCEL" block bsStyle="danger">Cancel</Button>
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <Button onClick={this.onClick} data-key="4" block>4</Button>
          </Col>
          <Col xs={3}>
            <Button onClick={this.onClick} data-key="5" block>5</Button>
          </Col>
          <Col xs={3}>
            <Button onClick={this.onClick} data-key="6" block>6</Button>
          </Col>
          <Col xs={3}>
            <Button onClick={this.onClick} data-key="BACKSPACE" block bsStyle="warning">
              Correction
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <Button onClick={this.onClick} data-key="7" block>7</Button>
          </Col>
          <Col xs={3}>
            <Button onClick={this.onClick} data-key="8" block>8</Button>
          </Col>
          <Col xs={3}>
            <Button onClick={this.onClick} data-key="9" block>9</Button>
          </Col>
          <Col xs={3}>
            <Button onClick={this.onClick} data-key="" block>&nbsp;</Button>
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <Button onClick={this.onClick} data-key="" block>&nbsp;</Button>
          </Col>
          <Col xs={3}>
            <Button onClick={this.onClick} data-key="0" block>0</Button>
          </Col>
          <Col xs={3}>
            <Button onClick={this.onClick} data-key="" block>&nbsp;</Button>
          </Col>
          <Col xs={3}>
            <Button onClick={this.onClick} data-key="ENTER" block bsStyle="success">Enter</Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}
