import { getCardData } from '../utils/dataProvider';
import { error, wait, waitDone } from './atm';

export const CARD_INSERTED = 'CARD_INSERTED';
export const CHECK_PIN = 'CHECK_PIN';
export const RETURN_CARD = 'RETURN_CARD';

export function insertCard() {
  return (dispatch) => {
    dispatch(wait());

    getCardData().then(
      (card) => {
        dispatch(waitDone());
        dispatch({
          type: CARD_INSERTED,
          card
        });
      },
      (err) => dispatch(error(err))
    );
  };
}

export function checkPin(pin) {
  return {
    type: CHECK_PIN,
    pin
  };
}

export function returnCard() {
  return { type: RETURN_CARD };
}
