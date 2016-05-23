import { RESET } from '../actions/atm';
import { INSERT_CARD, CHECK_PIN, REMOVE_CARD } from '../actions/card';

/**
 * Reducer for card actions
 */

const initialState = {
  pin: '1234',
  isInserted: false,
  isAuthorised: false,
  attemptsCount: 0,
  maxAttempts: 3
};

export default (state = initialState, action) => {
  switch (action.type) {
    // On RESET, all reducers reset their part of the state.
    case RESET:
      return initialState;

    case INSERT_CARD:
      return {
        ...state,
        isInserted: true
      };

    case CHECK_PIN:
      if (action.card.isAuthorised) {
        return {
          ...state,
          // card data is passed as is from data provider;
          // currently, some fields are not used
          ...action.card,
          isAuthorised: true,
          attemptsCount: 0
        };
      } else {
        const attemptsCount = state.attemptsCount + 1;
        return {
          ...state,
          attemptsCount,
          isBlocked: attemptsCount >= state.maxAttempts
        };
      }

    case REMOVE_CARD:
      return {
        ...state,
        isInserted: false
      };

    default:
      return state;
  }
};
