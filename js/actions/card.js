import { getCardData, authorizeCard } from '../utils/dataProvider';
import { error, wait, waitDone } from './atm';

/**
 * Card actions: insert card, check pin, return card.
 * insertCard and checkPin are asynchronous and dispatch wait/waitDone actions.
 */

export const INSERT_CARD = 'INSERT_CARD';
export const CHECK_PIN = 'CHECK_PIN';
export const RETURN_CARD = 'RETURN_CARD';

export function insertCard() {
  return (dispatch) => {
    dispatch(wait());

    getCardData().then(
      (card) => {
        dispatch({
          type: INSERT_CARD,
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
      (authorisedCard) => {
        dispatch({
          type: CHECK_PIN,
          card: authorisedCard
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
