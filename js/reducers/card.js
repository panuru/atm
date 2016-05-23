import { RESET } from '../actions/atm';
import { CARD_INSERTED, CHECK_PIN, REMOVE_CARD } from '../actions/card';

const initialState = {
  pin: 1234,
  isInserted: false,
  isAuthorised: false,
  attemptsCount: 0,
  maxAttempts: 3
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET:
      return initialState;

    case CARD_INSERTED:
      return {
        ...state,
        isInserted: true
      };

    case CHECK_PIN:
      if (action.authData.isAuthorised) {
        return {
          ...state,
          isAuthorised: true,
          cardHolder: action.authData.cardHolder,
          balance: action.authData.balance,
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
