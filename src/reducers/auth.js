import {
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  AUTHENTICATE_USER,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  PERSIST_USER,
  LOGOUT_USER,
  CLEAR_AUTH_STATE,

  // CLEAR_AUTH_STATE,
} from '../actions/actionsTypes';

const initialState = {
  user: {},
  error: null,
  isLoggedin: false,
  inProgress: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_START:
    case LOGIN_START:
      return {
        ...state,
        inProgress: true,
        error: null,
      };
    case SIGNUP_FAILED:
    case LOGIN_FAILED:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedin: true,
        user: action.user,
        error: null,
        inProgress: false,
      };
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
        isLoggedin: true,
      };

    case PERSIST_USER:
      return {
        ...state,
        user: action.user,
        isLoggedin: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedin: false,
        user: {},
      };
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
