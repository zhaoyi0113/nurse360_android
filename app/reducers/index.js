import {combineReducers} from 'redux'
import {LoginReducer} from './login_reducer';

const initialState = {
};

const rootReducer = (state=initialState, action) => {
  if(action.type === 'LOGOUT_ACTION'){
    //clear state when logout
    state = {}
  }
  return appReducers(state, action);
}

const appReducers = combineReducers({
  login: LoginReducer
});

export default rootReducer;
