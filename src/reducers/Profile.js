import {
  FETCH_USER_PROFILE,
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCESS,
} from '../actions/actionsTypes';

const initialState = {
  user: {},
  error: null,
  success: null,
  inProgress: false,
};

export function profile(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_PROFILE:
      return {
        ...state,
        inProgress: true,
      };
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.user,
        inProgress: false,
        success: true,
      };
    case USER_PROFILE_FAILURE:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };
    default:
      return state;
  }
}
