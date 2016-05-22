import actionTypes from './actionTypes';

export default {
  insertCart: () => (
    {
      type: actionTypes.INSERT_CART,
      cart: {
        authorised: false,
        pin: 1234
      }
    })
};
