import { RESET, ERROR, WAIT, WAIT_DONE } from '../actions/atm';

/**
 * Reducer for common actions like error, wait
 */

const initialState = {
  isWaiting: false,
  isError: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    // On RESET, all reducers reset their part of the state.
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
