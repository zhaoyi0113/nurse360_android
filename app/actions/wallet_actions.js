import * as types from './action_types';
import * as commonActions from './common_actions';

export const queryWallet = (token) => {
  return commonActions.requestGet(types.QUERY_WALLET_HTTP, '/nurse/wallet', token);
}

export const withdraw = (token, amount) => {
  return commonActions.requestPost(types.WITHDRAW_HTTP, '/nurse/wallet/withdraw', {withdraw_cash:amount}, token);
}