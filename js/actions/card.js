import { getCardData, authorizeCard } from '../utils/dataProvider';
import { error, wait, waitDone } from './atm';

export const CARD_INSERTED = 'CARD_INSERTED';
export const CHECK_PIN = 'CHECK_PIN';
export const RETURN_CARD = 'RETURN_CARD';

export function insertCard() {
  return (dispatch) => {
    dispatch(wait());

    getCardData().then(
      (card) => {
        dispatch({
          type: CARD_INSERTED,
          card
        });
        dispatch(waitDone());
      },
      (err) => dispatch(error(err))
    );
  };
}

export function checkPin(card, pin) {
  return (dispatch) => {
    dispatch(wait());

    authorizeCard(card, pin).then(
      (authData) => {
        dispatch({
          type: CHECK_PIN,
          authData
        });
        dispatch(waitDone());
      },
      (err) => dispatch(error(err))
    );
  };
}

export function returnCard() {
  return { type: RETURN_CARD };
}
