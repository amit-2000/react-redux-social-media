import {
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
} from '../actions/actionsTypes';

const initialState = {
  user: {},
  error: null,
  isLoggedin: false,
  inProgress: false,
};

export function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        inProgress: true,
        error: null,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedin: true,
        user: action.user,
        error: null,
        inProgress: false,
      };

    default:
      return state;
  }
}
