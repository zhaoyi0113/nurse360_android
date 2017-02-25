import {Root} from '../routers';

const initialNavState = {
  index: 0,
  routes: [
    {key: 'InitA', routeName: 'Main'},
  ],
};

export const NavReducer = (state = initialNavState, action) => {
  return Root.router.getStateForAction(action, state) || state;
}