import '../../css/components/SelectAmount.scss';

import React, { Component, PropTypes } from 'react';
import PubSub from 'pubsub-js';
import { Button, Col, Grid, Panel, Row } from 'react-bootstrap';

export default class SelectAmount extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  componentDidMount() {
    this.__pubSubToken = PubSub.subscribe('KEYBOARD', (msg, data) => this.onKeyUp(data));
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.__pubSubToken);
  }

  onClick(e) {
    const amount = parseInt(e.target.getAttribute('data-amount'), 10);
    if (isNaN(amount)) { return; }
    this.props.onSelect(amount);
  }

  onKeyUp(e) {
    console.log(e);
  }

  render() {
    return (
      <Panel header="Please select amount to withdraw">
        <Grid fluid className="select-amount-grid">
          <Row>
            <Col xs={6}>
              <Button onClick={this.onClick} data-amount="50" block>50</Button>
            </Col>
            <Col xs={6}>
              <Button onClick={this.onClick} data-amount="100" block>100</Button>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Button onClick={this.onClick} data-amount="150" block>150</Button>
            </Col>
            <Col xs={6}>
              <Button onClick={this.onClick} data-amount="200" block>200</Button>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Button onClick={this.onClick} data-amount="300" block>300</Button>
            </Col>
            <Col xs={6}>
              <Button onClick={this.onClick} data-amount="500" block>500</Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button onClick={this.onClick} block>Enter custom amount</Button>
            </Col>
          </Row>
        </Grid>
      </Panel>
    );
  }
}
