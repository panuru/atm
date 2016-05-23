import { RESET, ERROR, WAIT, WAIT_DONE } from '../actions/atm';

const initialState = {
  isWaiting: false,
  isError: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET:
      return initialState;

    case ERROR:
      return {
        ...state,
        isError: true
      };
    case WAIT:
      return {
        ...state,
        isWaiting: true
      };
    case WAIT_DONE:
      return {
        ...state,
        isWaiting: false
      };

    default:
      return state;
  }
};
