import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state=initialState.courses,action){
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
    debugger;
      return action.courses;
      case types.CREATE_COURSE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.course)
      ];
      case types.UPDATE_COURSE_SUCCESS:
      debugger;
        return [...state.filter(course=>course.id!==action.course.id),Object.assign({},action.course)];
    case types.DELETE_COURSE_SUCCESS:
      debugger;
      state =removeItem(state,action);
      return  [...state];
    default:
    return state;
  }
}

function removeItem(array, action) {
  return [
    ...array.slice(0, action.index),
    ...array.slice(action.index + 1)
  ];
}
