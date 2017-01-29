import {combineReducers} from 'redux'

const initialState = {
};
const rootReducer = (state=initialState, action) => {
  if(action.type === 'LOGOUT_ACTION'){
    //clear state when logout
    state = {}
  }
  return state
}


export default rootReducer;
