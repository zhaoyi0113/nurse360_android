import {combineReducers} from 'redux'
import {LoginReducer} from './login_reducer';
import {CommonReducer} from './common_reducer';
import * as types from '../actions/action_types';

const initialState = {};

const rootReducer = (state = initialState, action) => {
  if (action.type === types.LOGOUT_HTTP + types.SUCCESS) {
    //clear state when logout
    state = {}
  } else if (action.type === types.REDUX_STORAGE_LOAD) {
    state = action.payload;
  }
  return appReducers(state, action);
}

const appReducers = combineReducers({
  login: LoginReducer,
  common: CommonReducer,
});

export default rootReducer;
