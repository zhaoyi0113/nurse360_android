import * as types from './action_types';
import * as commonActions from './common_actions';


export const queryVisitItems = (token) => {
  return commonActions.requestGet(types.GET_VISIT_ITEMS_HTTP, '/nurse/visit/patient/service/item', token);
}