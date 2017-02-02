import * as types from './action_types';

export const requestWaitingIndicator = (waiting) => {
  return {type: types.WAITING_INDICATOR, waitingIndicator: waiting};
}