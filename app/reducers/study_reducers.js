import * as types from '../actions/action_types';

export const StudyReducer = (state = {}, action) => {
  switch (action.type) {
    case types.QUERY_STUDY_COURSES + types.SUCCESS:
      return {...state, courses: action.payload.data};
    case types.QUERY_STUDY_COURSES_DETAIL_HTTP + types.SUCCESS:
      return {...state, course: {content: action.payload.data}};
    case types.QUERY_STUDY_COURSE_LIST_HTTP + types.SUCCESS:
      return {...state, courseList: action.payload.data};
    case types.READ_STUDY_COURSE+types.SUCCESS:
      const {courses} = state;
      courses && courses.map((course)=>{
        if(course === action.payload.data.courseId){
          course.hasRead = 'YES';
        }
      });
      return {...state, courses};
    default:
      return state;
  }
}