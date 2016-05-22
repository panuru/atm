import actionTypes from './actionTypes';

export default {
  insertCard: () => (
    {
      type: actionTypes.INSERT_CARD,
      card: {
        pin: 1234
      }
    }),
  checkPin: (pin) => (
    {
      type: actionTypes.CHECK_PIN,
      pin
    }),
  returnCard: () => ({ type: actionTypes.RETURN_CARD }),
  reset: () => ({ type: actionTypes.RESET })
};
