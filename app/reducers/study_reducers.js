import * as types from '../actions/action_types';

export const StudyReducer = (state = {}, action) => {
  switch (action.type) {
    case types.QUERY_STUDY_COURSES + types.SUCCESS:
      return {...state, courses: action.payload.data}
    default:
      return state;
  }
}