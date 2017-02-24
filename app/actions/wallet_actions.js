import * as types from './action_types';
import * as commonActions from './common_actions';

export const queryWallet = (token) => {
  return commonActions.requestGet(types.QUERY_WALLET_HTTP, '/nurse/wallet', token);
}