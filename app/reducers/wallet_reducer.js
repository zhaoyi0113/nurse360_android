import * as types from '../actions/action_types';

export const WalletReducer = (state = {}, action) => {
  switch (action.type) {
    case types.QUERY_WALLET_HTTP + types.SUCCESS:
      return {...state, wallets: action.payload.data};
    default:
      return state;
  }
}
