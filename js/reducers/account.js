import { RESET } from '../actions/atm';
import { LOAD_ACCOUNT, WITHDRAW_CASH } from '../actions/account';

/**
 * Reducer for account actions
 */

const initialState = {
  balance: 0,
  isLoaded: false,
  hasWithdrawn: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    // On RESET, all reducers reset their part of the state.
    case RESET:
      return initialState;

    case LOAD_ACCOUNT:
      return {
        ...action.account,
        isLoaded: true,
        hasWithdrawn: false
      };

    case WITHDRAW_CASH:
      return {
        ...state,
        ...action.account,
        hasWithdrawn: action.amount
      };

    default:
      return state;
  }
};
