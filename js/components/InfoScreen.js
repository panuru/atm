import React, { Component, PropTypes } from 'react';
import { Jumbotron, ProgressBar } from 'react-bootstrap';

export default class InfoScreen extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onDismiss: PropTypes.func.isRequired,
    timeToDismiss: PropTypes.number
  };

  static defaultProps = {
    timeToDismiss: 10000
  }

  constructor(props) {
    super(props);

    this.state = {
      countdown: 100
    };

    this.__interval = setInterval(() => {
      const countdown = this.state.countdown - 1;
      this.setState({ countdown });

      if (countdown === 0) {
        this.dismiss();
      }
    }, this.props.timeToDismiss / 100);
    this.dismiss = this.dismiss.bind(this);
  }

  dismiss() {
    clearInterval(this.__interval);
    this.props.onDismiss();
  }

  render() {
    const { title, message } = this.props;
    return (
      <Jumbotron onClick={this.dismiss}>
        <h1>{title}</h1>
        <p>{message}</p>
        <small>
          This message will be automatically dismissed in&nbsp;
          {Math.round(this.state.countdown * this.props.timeToDismiss / (100 * 1000))} s.
        </small>
        <ProgressBar active now={100 - this.state.countdown} />
      </Jumbotron>
    );
  }
}
