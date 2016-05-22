import actionTypes from './actionTypes';

export default {
  insertCard: () => (
    {
      type: actionTypes.INSERT_CARD,
      card: {
        pin: 1234
      }
    }),
  checkPin: (input) => (
    {
      type: actionTypes.CHECK_PIN,
      input
    }),
  returnCard: () => (
    {
      type: actionTypes.RETURN_CARD
    }),
};
