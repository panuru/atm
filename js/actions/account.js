import { getAccountData, withdrawFromAccount } from '../utils/dataProvider';
import { error, wait, waitDone } from './atm';

/**
 * Account actions: load account and withdraw cash.
 * Both are asynchronous and dispatch wait/waitDone actions.
 */

export const LOAD_ACCOUNT = 'LOAD_ACCOUNT';
export const WITHDRAW_CASH = 'WITHDRAW_CASHN';

export function load(card) {
  return (dispatch) => {
    dispatch(wait());

    getAccountData(card).then(
      (account) => {
        dispatch({
          type: LOAD_ACCOUNT,
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
          type: WITHDRAW_CASH,
          amount,
          account: newAccount
        });
        dispatch(waitDone());
      }, (err) => dispatch(error(err))
    );
  };
}
