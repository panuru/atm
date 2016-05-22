import actionTypes from '../actions/actionTypes';

const initialState = {
  cart: null,
  presetWithdrawAmounts: [50, 100, 150, 200, 300, 500],
  transactionState: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INSERT_CART:
      return {
        ...state,
        cart: action.cart
      };

    default:
      return state;
  }
};
