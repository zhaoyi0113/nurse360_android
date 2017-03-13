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
      return Root.router.getStateForAction(NavigationActions.navigate({ routeName: 'Main' }), state);
  }
  if (action.type.startsWith('Navigation/')) {
    const { type, routeName } = action
    const lastRoute = state.routes[state.routes.length - 1]
    if (type == lastRoute.type && routeName == lastRoute.routeName) return state
  }
  console.log('getStateForAction,', (getStateForAction(action, state) || state))
  return getStateForAction(action, state) || state;
}