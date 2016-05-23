import actionTypes from './actionTypes';
import { getCardData } from '../utils/dataProvider';

export function returnCard() {
  return { type: actionTypes.RETURN_CARD };
}
export function reset() {
  return { type: actionTypes.RESET };
}
export function error(err) {
  return {
    type: actionTypes.ERROR,
    err
  };
}

export function receiveCard() {
  return {
    type: actionTypes.INSERT_CARD
  };
}
export function readCard(card) {
  return {
    type: actionTypes.READ_CARD,
    card
  };
}
export function insertCard() {
  return (dispatch) => {
    dispatch(receiveCard());

    getCardData().then(
      (card) => dispatch(readCard(card)),
      (err) => dispatch(error(err))
    );
  };
}

export function checkPin(pin) {
  return {
    type: actionTypes.CHECK_PIN,
    pin
  };
}
