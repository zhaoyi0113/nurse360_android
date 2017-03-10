import {combineReducers} from "redux";
import {LoginReducer} from "./login_reducer";
import {CommonReducer} from "./common_reducer";
import {UserReducer} from "./user_reducer";
import {HospitalReducer} from "./hospital_reducer";
import {StudyReducer} from "./study_reducers";
import {NotificationReducer} from "./notification_reducers";
import {OrderReducer} from "./order_reducer";
import * as types from "../actions/action_types";
import {WalletReducer} from './wallet_reducer';
import {NavReducer} from './nav_reducer';
import {VisitReducer} from './visit_reducer';

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
  user: UserReducer,
  hospital: HospitalReducer,
  study: StudyReducer,
  notification: NotificationReducer,
  order: OrderReducer,
  wallet: WalletReducer,
  nav: NavReducer,
  visit: VisitReducer,
});

export default rootReducer;
