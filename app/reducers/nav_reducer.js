import {getStateForAction} from '../routers';
import {NavigationActions} from 'react-navigation';
import * as types from '../actions/action_types';
import {Root} from '../routers';

const initialNavState = {
  index: 1,
  routes: [
    {key: 'InitA', routeName: 'Main'},
    {key: 'InitB', routeName: 'Login'},
  ],
};

export const NavReducer = (state = initialNavState, action) => {
  switch (action.type) {
    case types.LOGIN_HTTP + types.SUCCESS:
      console.log('xxxxx', action);
      return Root.router.getStateForAction(NavigationActions.navigate({ routeName: 'Main' }), state);
  }
  return getStateForAction(action, state) || state;
}