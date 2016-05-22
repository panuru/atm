import actionTypes from '../actions/actionTypes';

const initialState = {
  card: null,
  presetWithdrawAmounts: [50, 100, 150, 200, 300, 500],
  transactionState: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INSERT_CARD:
      return {
        ...state,
        card: {
          ...action.card,
          authorised: false
        }
      };

    case actionTypes.CHECK_PIN:
      return {
        ...state,
        card: {
          ...state.card,
          authorised: action.input === state.card.pin
        }
      };

    default:
      return state;
  }
};
