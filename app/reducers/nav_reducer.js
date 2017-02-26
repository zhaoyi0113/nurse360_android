import {Root} from '../routers';

const initialNavState = {
  index: 1,
  routes: [
    {key: 'InitA', routeName: 'Main'},
    {key: 'InitB', routeName: 'Login'},
  ],
};

export const NavReducer = (state = initialNavState, action) => {
  return Root.router.getStateForAction(action, state) || state;
}