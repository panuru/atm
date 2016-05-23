import '../../css/components/SelectAmount.scss';

import React, { Component, PropTypes } from 'react';
import { Button, Col, Grid, Modal, Panel, Row } from 'react-bootstrap';
import SelectCustomAmount from './SelectCustomAmount';

export default class SelectAmount extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    const amount = e.target.getAttribute('data-amount');
    if (amount === 'custom') {
      this.setState({ showModal: true });
      return;
    }
    this.props.onSelect(parseInt(amount, 10));
  }

  closeModal() {
    this.setState({ showModal: false });
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
              <Button onClick={this.onClick} data-amount="custom" block>Enter custom amount</Button>
            </Col>
          </Row>
        </Grid>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Enter custom amount</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SelectCustomAmount onCancel={this.closeModal} onSelect={this.props.onSelect} />
          </Modal.Body>
        </Modal>
      </Panel>

    );
  }
}
