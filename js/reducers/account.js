import { RESET } from '../actions/atm';
import { LOAD, WITHDRAW } from '../actions/account';

const initialState = {
  balance: 0,
  isLoaded: false,
  hasWithdrawn: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET:
      return initialState;

    case LOAD:
      return {
        ...action.account,
        isLoaded: true,
        hasWithdrawn: false
      };

    case WITHDRAW:
      return {
        ...state,
        balance: action.account.balance,
        hasWithdrawn: action.amount
      };

    default:
      return state;
  }
};
