import { getAccountData, withdrawFromAccount } from '../utils/dataProvider';
import { error, wait, waitDone } from './atm';

export const LOAD = 'LOAD';
export const WITHDRAW = 'WITHDRAWN';

export function load(card) {
  return (dispatch) => {
    dispatch(wait());

    getAccountData(card).then(
      (account) => {
        dispatch({
          type: LOAD,
          account
        });
        dispatch(waitDone());
      }, (err) => dispatch(error(err))
    );
  };
}

export function withdraw(account, amount) {
  return (dispatch) => {
    dispatch(wait());

    withdrawFromAccount(account, amount).then(
      (newAccount) => {
        dispatch({
          type: WITHDRAW,
          amount,
          account: newAccount
        });
        dispatch(waitDone());
      }, (err) => dispatch(error(err))
    );
  };
}
