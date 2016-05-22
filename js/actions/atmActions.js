import actionTypes from './actionTypes';

export default {
  insertCart: () => (
    {
      type: actionTypes.INSERT_CART,
      cart: {
        pin: 1234
      }
    }),
  checkPin: (input) => ({
    type: actionTypes.CHECK_PIN,
    input
  })
};
