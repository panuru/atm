import * as actionTypes from '../actions/actionTypes';

const initialState = {
  card: null,
  presetWithdrawAmounts: [50, 100, 150, 200, 300, 500],
  transactionState: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECEIVE_CARD:
      return {
        ...state,
        isWaiting: true
      };
    case actionTypes.READ_CARD:
      return {
        ...state,
        isWaiting: false,
        card: {
          ...action.card,
          authorised: false,
          attemptsCount: 0,
          maxAttempts: 3
        }
      };

    case actionTypes.CHECK_PIN:
      const isCorrectPin = action.pin === state.card.pin;
      if (isCorrectPin) {
        return {
          ...state,
          card: {
            ...state.card,
            authorised: true,
            attemptsCount: 0
          }
        };
      } else {
        const attemptsCount = state.card.attemptsCount + 1;
        return {
          ...state,
          card: {
            ...state.card,
            attemptsCount,
            isBlocked: attemptsCount >= state.card.maxAttempts
          }
        };
      }

    case actionTypes.REMOVE_CARD:
    case actionTypes.RESET:
      return {
        ...state,
        isError: false,
        isWaiting: false,
        card: null
      };
    case actionTypes.ERROR:
      return {
        ...state,
        isError: true
      };

    default:
      return state;
  }
};
